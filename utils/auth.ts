import jwt from "jsonwebtoken";
import { User } from "../types/app";

export const JWT_PRIVATE_KEY = process.env.JWTKEY ? process.env.JWTKEY : "KEY";

export const createJWT = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      time: Date.now(),
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: "72h",
    },
  );
};
