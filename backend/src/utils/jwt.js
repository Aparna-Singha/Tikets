import jwt from "jsonwebtoken";

export function encode(data) {
  return jwt.sign(data, process.env.JWT_SECRET);
}

export function decode(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

