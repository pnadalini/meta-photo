import { HttpStatusCode } from "axios";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import photoRouter from "./photo/photo-routes";
import AppError from "./utils/app-error";
import { handleError, isOperationalError } from "./utils/error-handler";

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  methods: "GET",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.use("/externalapi/photos", photoRouter);

// catch 404 and forward to error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next(new AppError(HttpStatusCode.NotFound, "Not found"));
  } else {
    next(err);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(err, req, res);
});

process.on("uncaughtException", (error) => {
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.listen(port, () => {
  console.log(`Visit http://localhost:${port}`);
});
