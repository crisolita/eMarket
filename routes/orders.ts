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

router.post(
  "/createOrder",
  validator.body(querySchemaCreateOrder),
  authenticateToken,
  createOrderController,
);
router.put(
  "/updateOrder",
  validator.body(querySchemaUpdateOrder),
  isAdmin,
  updateOrderController,
);
router.get(
  "/getHistoryOrderByUser",
  authenticateToken,
  getOrderHistoryController,
);
router.get("/getAllHistoryOrder", isAdmin, getAllOrderHistoryController);

export default router;
