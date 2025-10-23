import User from "#models/user.js";
import { decode } from "#utils/jwt.js";

const authMiddleware = async (req, _, next) => {
  const token = req.getCookie("token");
  if (!token) return next();

  const { email } = decode(token);
  
  const user = await User.findOne({ email });
  if (!user) return next();

  const { name, org } = user;
  if (user.verified.includes(token))
    req.user = { email, name, org };

  return next();
};

export default authMiddleware;

