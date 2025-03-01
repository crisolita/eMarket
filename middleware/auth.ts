import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../utils/auth";
import { AuthRequest } from "../types/app";
import { getUserById } from "../services/user";

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  } // Si no hay token, rechazar acceso

  jwt.verify(token, JWT_PRIVATE_KEY, async (err, payload) => {
    if (err || !payload || typeof payload === "string")
      return res.sendStatus(401); // Si el token es inválido, rechazar acceso

    try {
      const user = await getUserById(payload.id);

      if (!user) {
        res.sendStatus(401);
        return;
      }

      req.user = user;

      next(); // Si es admin, continua al siguiente middleware
    } catch (error) {
      res.sendStatus(500); // En caso de error al obtener el usuario
    }
  });
}
