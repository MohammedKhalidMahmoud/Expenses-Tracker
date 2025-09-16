import express from 'express';
import * as ExpenseValidator from '../Middlewares/ExpenseValidator.js';
import * as ExpenseController from '../Controllers/Expense.controller.js';
import authMiddleware from '../Middlewares/auth.js';

const router= express.Router();

router.route('/')
  .get(authMiddleware, ExpenseController.getExpensesById)
  .post(ExpenseValidator.validateExpense, authMiddlewareExpenseController.createExpense);
  // .put(ExpensValidator.validateExpense, ExpensController.updateExpens);
//   .delete(ExpensController.deleteAllExpenses);


router.route('/:id')
.put(ExpenseValidator.validateExpense, authMiddleware, ExpenseController.updateExpense);

router.route('/daily')
  .get(authMiddleware, ExpenseController.getDailyExpenses);

export default router;

