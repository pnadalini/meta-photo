import { HttpStatusCode } from "axios";

class AppError extends Error {
  statusCode: HttpStatusCode;
  isOperational: boolean;

  constructor(statusCode: HttpStatusCode, message: any, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
