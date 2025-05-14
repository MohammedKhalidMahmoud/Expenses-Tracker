import * as ExpensValidator from '../Middlewares/ExpensValidator.js';
import * as ExpensController from '../Controllers/expens.controller.js';
import express from 'express';

const router= express.Router();

router.route('/api/expens')
  .get(ExpensController.getAllExpenses);
//   .post(ExpensValidator.validateExpense, ExpensController.createExpense)
//   .put(ExpensController.updateAllExpenses)
//   .delete(ExpensController.deleteAllExpenses);



export default router;













// app.route('/api/expens')
//   .get((req, res) => {
//     res.status(200).json({ message: "GET all expenses" });
//   })
//   .post((req, res) => {
//     const { amount, category, date, description } = req.body;
//     const token=req.headers['authorization'];
//     authenticateToken(token);
//     console.log(amount, category, date, description);
//     Expense.create({ amount, category, date, description })
//       .then(expense => {
//         console.log("Expense created successfully:", expense);
//       }).catch(error => {
//         console.error("Error creating expense:", error);
//         res.status(500).json({ message: "Error creating expense" });
//       });
//     res.status(201).json({ message: "POST new expense" });
//   })
//   .put((req, res) => {
//     res.status(200).json({ message: "PUT update all expenses" });
//   })
//   .delete((req, res) => {
//     res.status(200).json({ message: "DELETE all expenses (dangerous!)" });
//   });