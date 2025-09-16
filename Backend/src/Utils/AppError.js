export class AppError extends Error {
 

  constructor(message, statusCode = 500, status = 'false', errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.errors = errors;

    // Capturing stack trace, useful for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

// export const handleErrorResponse = (res, error) => {
//   console.error(error);
//   if (error.message.includes("token")) {
//     return res.status(401).json({ success: false, message: error.message });
//   }
//   res.status(500).json({ success: false, message: "Server error", error: error.message });
// };