import express from "express";

import Joivalidator from "express-joi-validation";
import {  querySchemaCreateProduct, querySchemaDeleteProduct, querySchemaUpdateProduct } from "../middleware/validation";
import {  createProductController, deleteProductController, getAllProductsController, updateProductController } from "../controllers/backoffice";
import { isAdmin } from "../middleware/isAdmin";


const validator = Joivalidator.createValidator({ passError: true });

const router = express.Router();

router.post(
  "/createProduct",
  validator.body(querySchemaCreateProduct),isAdmin,
  createProductController
);
router.put(
    "/updateProduct",
    validator.body(querySchemaUpdateProduct),isAdmin,
    updateProductController
  );
  router.delete(
    "/deleteProduct",
    validator.body(querySchemaDeleteProduct),isAdmin,
    deleteProductController
  );


router.get("/getAllProducts", getAllProductsController);

export default router;