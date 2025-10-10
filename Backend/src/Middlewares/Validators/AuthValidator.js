/**
 * Validation Middleware Module
 * 
 * Provides request validation and error handling for authentication routes
 * Uses express-validator for validation rules and custom error formatting
 */

import { body, validationResult } from 'express-validator';
import { AppError } from '../../Utils/AppError.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Format validation errors for consistent API response
    const validationErrors = errors.array().map((err) => ({
      field: err.param,    // The field that failed validation
      message: err.msg,    // The validation error message
    }));

    throw new AppError(
      'Validation error: One or more fields are incorrect',  // General error message
      400,                                                // HTTP status code
      validationErrors                                   // Detailed field errors
    );
  }
  next();
};

export const validateSignup = [
  // Validate name field
  // body('name')
  //   .notEmpty()
  //   .withMessage('First name is required'),
    
  // // Validate email field
  // body('email')
  //   .isEmail()
  //   .withMessage('Invalid email format'),
    
  // // Validate password field
  // body('password')
  //   .notEmpty()
  //   .withMessage('Password is required'),  // Fixed message (was "Last name is required")
    
  // Handle validation results
  handleValidationErrors,
];

export const validateLogin = [
  // Validate email field
  body('email')
    .notEmpty()
    .withMessage('Email is required'),  // Fixed message (was "Last name is required")
    
  // Validate password field
  body('password')
    .notEmpty()
    .withMessage('Password is required'),  // Fixed message (was "Invalid email format")
    
  // Handle validation results
  handleValidationErrors,
];

export const validateResetPassword = [
  // Validate oldPassword field
  body('oldPassword')
    .notEmpty()
    .withMessage('Old password is required'),
  // Validate newPassword field
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required'),
  // Validate confirmPassword field
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  // Handle validation results
  handleValidationErrors,
];
