export class AppError extends Error {
 

  constructor(message, statusCode = 500, code = 'CUSTOM_ERROR', errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;

    // Capturing stack trace, useful for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}