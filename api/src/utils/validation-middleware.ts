import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import AppError from "../utils/app-error";

const validateQuery = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.query);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(", ");

    return next(new AppError(HttpStatusCode.BadRequest, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

export { validateQuery };
