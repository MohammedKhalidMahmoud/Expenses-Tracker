import express from "express";
import * as ExpenseController from "../Controllers/Expense.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { requireAdminRole } from "../Middlewares/adminCheck.middleware.js";

const router = express.Router();

router.get("/all", authMiddleware, requireAdminRole, ExpenseController.getAllExpenses);

router
  .route("/")
  .get(authMiddleware, ExpenseController.getExpenses)
  .post(authMiddleware, ExpenseController.createExpense);

router
  .route("/:id")
  .get(authMiddleware, ExpenseController.getExpenseById)
  .put(authMiddleware, ExpenseController.updateExpense)
  .delete(authMiddleware, ExpenseController.deleteExpense);

export default router;