
import { errorResponse } from "../Utils/resposne.js";

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, message, statusCode, err.errors || null);
};

