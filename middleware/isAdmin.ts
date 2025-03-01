import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../utils/auth";
import { getUserById } from "../services/user";
import { AuthRequest } from "../types/app";

export function isAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, JWT_PRIVATE_KEY, async (err, payload) => {
    if (err || !payload || typeof payload === "string") {
      res.sendStatus(401); // En caso de error, se envía una respuesta 401
      return;
    }

    try {
      const user = await getUserById(payload.id);

      if (user?.userRol !== "ADMIN") {
        res.sendStatus(403); // Si no es admin, se responde con 403
        return;
      }

      req.user = user;

      next(); // Si es admin, continua al siguiente middleware
    } catch (error) {
      res.sendStatus(500); // En caso de error al obtener el usuario
    }
  });
}
