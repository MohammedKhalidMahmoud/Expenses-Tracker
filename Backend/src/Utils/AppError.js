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

