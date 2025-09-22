import { errorResponse } from "../Utils/resposne.js";
import { AppError } from "../Utils/AppError.js";

export const globalErrorHandler = (err, req, res, next) => {
  // Default fallback
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Use unified error response format
  return errorResponse(res, message, statusCode, err.details || null);
};
