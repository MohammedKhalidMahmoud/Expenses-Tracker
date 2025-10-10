import { errorResponse } from "../Utils/resposne.js";

export const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  const {statusCode, message, details} = err;
  console.log("statusCode: ", statusCode);
  console.log("message", message);
  console.log("details", details);
  // Use unified error response format
  return errorResponse(res, message, statusCode, details);
};
