import { Request } from "express";

export type User = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  userRol: 'ADMIN' | 'CLIENT';
  authToken: string | null;
}

export interface AuthRequest extends Request {
    user?: User;
  }