import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user";
import backofficeRouter from "./routes/backoffice";
import orderRouter from "./routes/orders"
dotenv.config();

const prisma = new PrismaClient();
export const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.prisma = prisma;
  next();
});
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

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
  </head>
  <body>
    <h1>Hello from Render!</h1>
  </body>
</html>
`;

app.get("/", (req: Request, res: Response) => {
  res.type("html").send(html);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
