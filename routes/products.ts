import express from "express";

import Joivalidator from "express-joi-validation";
import {
  querySchemaCreateProduct,
  querySchemaDeleteProduct,
  querySchemaUpdateProduct,
} from "../middleware/validation";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  updateProductController,
} from "../controllers/products";
import { isAdmin } from "../middleware/isAdmin";

const validator = Joivalidator.createValidator({ passError: true });

const router = express.Router();
/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: Permite la creación de un producto con detalles como nombre, descripción, precio y stock.
 *     tags:
 *       - Productos
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Producto A"
 *               description:
 *                 type: string
 *                 example: "Descripción del producto A"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "9b03f30d-dc2c-4b4e-bbe5-8df67d5bdf44"
 *                 name:
 *                   type: string
 *                   example: "Producto A"
 *                 description:
 *                   type: string
 *                   example: "Descripción del producto A"
 *                 price:
 *                   type: number
 *                   example: 29.99
 *                 stock:
 *                   type: integer
 *                   example: 100
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
  "/createProduct",
  validator.body(querySchemaCreateProduct),
  isAdmin,
  createProductController,
);
/**
 * @swagger
 * /products/updateProduct:
 *   put:
 *     summary: Actualiza la información de un producto existente
 *     description: Permite actualizar los detalles de un producto (nombre, descripción, precio y stock) utilizando su ID.
 *     tags:
 *       - Productos
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               id:
 *                 type: string
 *                 example: "12345"
 *               name:
 *                 type: string
 *                 example: "Producto A"
 *               description:
 *                 type: string
 *                 example: "Descripción actualizada del producto A"
 *               price:
 *                 type: number
 *                 example: 39.99
 *               stock:
 *                 type: integer
 *                 example: 120
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Producto A"
 *                 description:
 *                   type: string
 *                   example: "Descripción actualizada del producto A"
 *                 price:
 *                   type: number
 *                   example: 39.99
 *                 stock:
 *                   type: integer
 *                   example: 120
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Producto no encontrado"
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
  "/updateProduct",
  validator.body(querySchemaUpdateProduct),
  isAdmin,
  updateProductController,
);

/**
 * @swagger
 * /products/deleteProduct:
 *   delete:
 *     summary: Elimina un producto existente
 *     description: Permite eliminar un producto basado en su ID. No se puede eliminar si el producto está asociado a un orden.
 *     tags:
 *       - Productos
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto eliminado con exito"
 *       400:
 *         description: El producto está en un orden y no puede ser eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Producto en un orden no puede ser eliminado"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Producto no encontrado"
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

router.delete(
  "/deleteProduct",
  validator.body(querySchemaDeleteProduct),
  isAdmin,
  deleteProductController,
);

/**
 * @swagger
 * /products/getAll:
 *   get:
 *     summary: Obtiene todos los productos con paginación
 *     description: Devuelve una lista de productos con paginación. Permite especificar la página y el número de elementos por página.
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número de página (opcional, por defecto 1)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         description: Número de elementos por página (opcional, por defecto 10)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de productos con paginación
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
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       name:
 *                         type: string
 *                         example: "Producto ejemplo"
 *                       description:
 *                         type: string
 *                         example: "Descripción del producto"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 19.99
 *                       stock:
 *                         type: integer
 *                         example: 100
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

router.get("/getAll", getAllProductsController);

export default router;
