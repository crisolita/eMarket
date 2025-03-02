import express from "express";

import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import {
  querySchemaCreateOrder,
  querySchemaUpdateOrder,
} from "../middleware/validation";
import {
  createOrderController,
  getAllOrderHistoryController,
  getOrderHistoryController,
  updateOrderController,
} from "../controllers/orders";

const validator = Joivalidator.createValidator({ passError: true });

const router = express.Router();
/**
 * @swagger
 * /orders/createOrder:
 *   post:
 *     summary: Crea un nuevo pedido
 *     description: Este endpoint permite crear un pedido a partir de una lista de productos proporcionada en el cuerpo de la solicitud. Se valida si los productos son válidos antes de crear la orden.
 *     tags:
 *       - Pedidos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Lista de productos para crear el pedido.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "12345"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   example: "67890"
 *                 userId:
 *                   type: string
 *                   example: "user123"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: "12345"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *       400:
 *         description: Error en los productos proporcionados (por ejemplo, productos no válidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Producto no encontrado o no válido"
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
  "/createOrder",
  validator.body(querySchemaCreateOrder),
  authenticateToken,
  createOrderController,
);
/**
 * @swagger
 * /orders/updateOrder:
 *   put:
 *     summary: Actualiza el estado de una orden
 *     description: Permite a los administradores actualizar el estado de una orden existente.
 *     tags:
 *       - Pedidos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "67890"
 *               orderStatus:
 *                 type: string
 *                 enum: [PENDIENTE_PAGO, PAGADO, CANCELADO, ENTREGADO]
 *                 example: "PAGADO"
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   example: "67890"
 *                 orderStatus:
 *                   type: string
 *                   example: "PAGADO"
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Orden no encontrada"
 *       401:
 *         description: No autorizado (JWT faltante o inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
 *       403:
 *         description: Acceso denegado (usuario sin permisos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
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

router.put(
  "/updateOrder",
  validator.body(querySchemaUpdateOrder),
  isAdmin,
  updateOrderController,
);
/**
 * @swagger
 * /orders/getHistoryOrderByUser:
 *   get:
 *     summary: Obtiene el historial de pedidos de un usuario
 *     description: Este endpoint permite obtener el historial de pedidos de un usuario, con paginación, mostrando los pedidos anteriores del usuario autenticado.
 *     tags:
 *       - Pedidos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página para la paginación.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número de resultados por página.
 *     responses:
 *       200:
 *         description: Historial de pedidos recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                         example: "67890"
 *                       status:
 *                         type: string
 *                         example: "completed"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-01T12:00:00Z"
 *                       totalPrice:
 *                         type: number
 *                         format: float
 *                         example: 150.00
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

router.get(
  "/getHistoryOrderByUser",
  authenticateToken,
  getOrderHistoryController,
);
/**
 * @swagger
 * /orders/getAllHistoryOrder:
 *   get:
 *     summary: Obtiene el historial de todas las órdenes
 *     description: Recupera todas las órdenes del sistema con paginación. Solo accesible para administradores o usuarios autorizados.
 *     tags:
 *       - Pedidos
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página para la paginación.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número de resultados por página.
 *     responses:
 *       200:
 *         description: Lista de todas las órdenes recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                         example: "67890"
 *                       userId:
 *                         type: string
 *                         example: "12345"
 *                       status:
 *                         type: string
 *                         example: "completed"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-01T12:00:00Z"
 *                       totalPrice:
 *                         type: number
 *                         format: float
 *                         example: 150.00
 *       401:
 *         description: No autorizado (JWT faltante o inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No autorizado"
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

router.get("/getAllHistoryOrder", isAdmin, getAllOrderHistoryController);

export default router;
