import express from "express";

import Joivalidator from "express-joi-validation";
import { authenticateToken } from "../middleware/auth";
import { changePasswordController, getRecoveryCode, getUserInfo, userLoginController, userRegisterController } from "../controllers/user";
import { querySchemaChangePassword, querySchemaGetRecoveryCode, querySchemaLogin, querySchemaRegistro } from "../middleware/validation";


const validator = Joivalidator.createValidator({ passError: true });

const router = express.Router();

router.post(
  "/register",
  validator.body(querySchemaRegistro),
  userRegisterController
);
router.post("/login", validator.body(querySchemaLogin), userLoginController);

router.put(
  "/getRecovery",
  validator.body(querySchemaGetRecoveryCode),
  getRecoveryCode
);
router.put(
  "/changePassword",
  validator.body(querySchemaChangePassword),
  changePasswordController
);

router.get("/getUserInfo", authenticateToken, getUserInfo);

export default router;