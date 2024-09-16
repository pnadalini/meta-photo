import axios, { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import AppError from "./app-error";

const handleError = (err: unknown, req: Request, res: Response) => {
  if (axios.isAxiosError(err) && req.accepts("json")) {
    res.status(err.response?.status || HttpStatusCode.InternalServerError);
    res.send({ error: err.message });
    return;
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
