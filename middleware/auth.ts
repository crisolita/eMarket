import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../utils/auth";

// Extender Request para incluir user
interface CustomRequest extends Request {
  user?:  string | JwtPayload;
}

export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }   // Si no hay token, rechazar acceso

  jwt.verify(token, JWT_PRIVATE_KEY as string,async (err, user) => {
    if (err) return res.sendStatus(401); // Si el token es inválido, rechazar acceso

    req.user = user; // Guardar el usuario en la request
    next(); // Pasar al siguiente middleware
  });
}
