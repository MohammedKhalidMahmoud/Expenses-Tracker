import { body, validationResult } from 'express-validator';
import { AppError } from '../Utils/AppError.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    throw new AppError('Validation error: One or more fields are incorrect', 400, 'VALIDATION_ERROR', validationErrors);
  }
  next();
};

export const validateSignup = [
  body('name').notEmpty().withMessage('First name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Last name is required'),
  handleValidationErrors,
];

export const validateLogin  = [
  body('email').notEmpty().withMessage('Last name is required'),
  body('password').notEmpty().withMessage('Invalid email format'),
  handleValidationErrors,
];

