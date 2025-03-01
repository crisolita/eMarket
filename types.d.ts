import * as express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// declare module "express-serve-static-core" {
//   interface Request {
//     user: { id: string;
//         email: string;
//         role: "ADMIN" | "USER";} | JwtPayload;
//   }
// }
