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

export const validateExpense = [
  body('amout').notEmpty().withMessage('Amoutn is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('description').notEmpty().withMessage('Description is required'),
  handleValidationErrors,
];









