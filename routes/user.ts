import express from "express";

import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import {  getUserInfo, userLoginController, userRegisterController } from "../controllers/user";
import {  querySchemaLogin, querySchemaRegistro } from "../middleware/validation";


const validator = Joivalidator.createValidator({ passError: true });

const router = express.Router();

router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController
);
router.post("/login", validator.body(querySchemaLogin), userLoginController);

router.get("/getUserInfo", authenticateToken, getUserInfo);

export default router;