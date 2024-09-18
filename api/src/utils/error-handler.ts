import axios, { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import AppError from "./app-error";

const handleError = (error: unknown, req: Request, res: Response) => {
  if (axios.isAxiosError(error) && req.accepts("json")) {
    res.status(error.response?.status || HttpStatusCode.InternalServerError);
    res.send({ error: error.message });
    return;
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).send(error.message);
  }
  res.status(HttpStatusCode.InternalServerError).send("Failed to load data");
};

const isOperationalError = (error: Error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

export { handleError, isOperationalError };
