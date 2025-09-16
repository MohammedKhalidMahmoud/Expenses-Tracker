/**
 * Expense Validation Middleware
 * 
 * Provides request validation and error handling for expense-related routes
 * Uses express-validator to validate expense creation/update payloads
 */

import { body, validationResult } from 'express-validator';
import { AppError } from '../../Utils/AppError.js';

/**
 * Centralized validation error handler
 * Formats validation errors into consistent API error response structure
 * 
 * @param {Object} req - Express request object 
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {AppError} Throws 400 error with validation details if validation fails
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Transform errors into consistent format for client consumption
    const validationErrors = errors.array().map((err) => ({
      field: err.param,      // Name of the invalid field
      message: err.msg,       // Human-readable error message
    }));

    throw new AppError(
      'Validation error: One or more fields are incorrect',  // General error message
      400,                                                // HTTP Bad Request status
      'VALIDATION_ERROR',                                 // Error type identifier
      validationErrors                                   // Array of field-specific errors
    );
  }
  next();
};

/**
 * Expense Data Validation Rules
 * Validates all required fields for expense creation/update:
 * - amount: Must be non-empty (should be numeric, consider adding .isNumeric())
 * - category: Must be non-empty
 * - date: Must be non-empty (consider adding .isISO8601() for date format validation)
 * - description: Must be non-empty
 */
export const validateCreation = [
  // Validate amount field
  

  // Process validation results
  handleValidationErrors,
];

export const validateModification = [
  // Validate amount field
  


  // Process validation results
  handleValidationErrors,
];




