import express from "express";

import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import {
  getUserInfo,
  userLoginController,
  userRegisterController,
} from "../controllers/user";
import {
  querySchemaLogin,
  querySchemaRegistro,
} from "../middleware/validation";

const validator = Joivalidator.createValidator({ passError: true });

const router = express.Router();
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea una nueva cuenta de usuario si el email no está registrado previamente.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstname
 *               - lastname
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123*"
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 firstname:
 *                   type: string
 *                   example: "John"
 *                 lastname:
 *                   type: string
 *                   example: "Doe"
 *       400:
 *         description: El email ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email ya registrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController,
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Inicia sesión en la plataforma
 *     description: Autentica a un usuario con email y contraseña, devolviendo un token JWT si las credenciales son correctas.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123*"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 userid:
 *                   type: string
 *                   example: "12345"
 *                 firstname:
 *                   type: string
 *                   example: "John"
 *                 lastname:
 *                   type: string
 *                   example: "Doe"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI..."
 *       400:
 *         description: Email o contraseña incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email o contraseña incorrectos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

router.post("/login", validator.body(querySchemaLogin), userLoginController);

/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: Obtiene la información del usuario autenticado
 *     description: Devuelve los datos del usuario autenticado, incluyendo su email, ID, nombre, apellido y un nuevo token JWT.
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token JWT para autenticación del usuario
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 firstname:
 *                   type: string
 *                   example: "John"
 *                 lastname:
 *                   type: string
 *                   example: "Doe"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

router.get("/info", authenticateToken, getUserInfo);

export default router;
