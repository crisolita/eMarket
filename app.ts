import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user";
import backofficeRouter from "./routes/backoffice";
import orderRouter from "./routes/orders"
dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/backoffice", backofficeRouter);
app.use("/order",orderRouter );


// Middleware para manejar errores de Joi
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err?.error?.isJoi) {
    res.status(400).json({
      error: err.error.details[0].message,
    });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`EMarket listening on port ${port}!`));
