import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../utils/auth";
import { getUserById } from "../services/user";

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  // @ts-ignore
  const prisma = req.prisma as PrismaClient;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
    return; 
  }

  jwt.verify(token, JWT_PRIVATE_KEY as string, async (err: any, user: any) => {
    if (err) {
      res.sendStatus(401);  // En caso de error, se envía una respuesta 401
      return; 
    }

    // @ts-ignore
    req.user = user;

    try {
      const usuario = await getUserById(user.id, prisma);

      if (usuario?.email !== "admin@gmail.com") {
        res.sendStatus(403); // Si no es admin, se responde con 403
        return; 
      }

      next();  // Si es admin, continua al siguiente middleware
    } catch (error) {
      res.sendStatus(500);  // En caso de error al obtener el usuario
    }
  });
}
