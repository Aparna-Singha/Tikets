import { Router } from "express";
import { hash, compare } from "bcrypt";

import User from "#models/user.js";
import { encode, decode } from "#utils/jwt.js";

const authRouter = Router();

authRouter.get("/code/:email", async (req, res) => {
  if (req.user) return res.status(200).json({
    code: null,
  });

  const { email } = req.params;
  const token = req.getCookie("token");

  if (token) {
    const payload = decode(token);
    const code = payload.code;
    
    return res.status(200).json({ code });
  }
  
  let code = Math.random().toString().slice(2, 8);
  let payload = { email, code };
  
  const newToken = encode(payload);
  res.setCookie("token", newToken);
  
  let user = await User.findOne({ email });
  
  if (!user) {
    const [ name, org ] = email.split("@");
    user = await User.create({ email, name, org });
  }

  user.unverified.push(newToken);
  await user.save();
  
  return res.status(201).json({ code });
});

authRouter.get("/status", (req, res) => {
  return res.status(200).json({
    signedIn: !!req.user,
    user: req.user,
    permissions: req.permissions,
  });
});

authRouter.get("/sign-out", (_, res) => {
  res.removeCookie("token");
  return res.status(200).json({
    message: "Signed out successfully",
  });
});

authRouter.post("/password", async (req, res) => {
  if (req.user) return res.status(400).json({
    success: false,
    message: "Already signed in",
  });

  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    const [ name, org ] = email.split("@");
    const salt = Number(process.env.SALT);
    const hashed = await hash(password, salt);
    
    user = await User.create({
      email, name, org,
      password: hashed,
    });
  }

  const passwordMatched = await compare(password, user.password);
  if (!passwordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const payload = { email };
  const token = encode(payload);
  res.setCookie("token", token);

  user.verified.push(token);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Signed in successfully",
  });
});

export default authRouter;

