import express from 'express';
import * as ExpensValidator from '../Middlewares/ExpensValidator.js';
import * as ExpensController from '../Controllers/Expens.controller.js';


const router= express.Router();

router.route('/')
  .get(ExpensController.getExpensesById)
  .post(ExpensValidator.validateExpense, ExpensController.createExpense);
  // .put(ExpensValidator.validateExpense, ExpensController.updateExpens);
//   .delete(ExpensController.deleteAllExpenses);


router.route('/:id')
.put(ExpensValidator.validateExpense, ExpensController.updateExpens);

router.route('/daily')
  .get(ExpensController.getDailyExpenses);

export default router;

