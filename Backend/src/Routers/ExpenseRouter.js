import express from 'express';
import * as ExpenseValidator from '../Middlewares/Validators/ExpenseValidator.js';
import * as ExpenseController from '../Controllers/Expense.controller.js';
import {authMiddleware} from '../Middlewares/auth.js';
import { requireAdminRole } from '../Middlewares/role.js';

const router = express.Router();

router.route('/')
.get(authMiddleware, requireAdminRole, ExpenseController.getExpenses)   
/**
 * @swagger
 * /api/v1/expenses:
 *   get:
 *     summary: Retrieve all expenses for the authenticated user
 *     description: Returns a list of expenses belonging to the logged-in user
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: Successfully retrieved expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 10
 *                   title:
 *                     type: string
 *                     example: Grocery shopping
 *                   amount:
 *                     type: number
 *                     example: 45.99
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 2025-09-16
 *                   userId:
 *                     type: integer
 *                     example: 1
 */
  .get(authMiddleware, ExpenseController.getExpensesById)
/**
 * @swagger
 * /api/v1/expenses:
 *   post:
 *     summary: Create a new expense
 *     description: Add a new expense record for the authenticated user
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Dinner at restaurant
 *               amount:
 *                 type: number
 *                 example: 75.50
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-15
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Invalid input data
 */
  .post(ExpenseValidator.validateExpense, authMiddleware, ExpenseController.createExpense);

router.route('/:id')
/**
 * @swagger
 * /api/v1/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     description: Update an existing expense record by ID
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Expense ID to update
 *         schema:
 *           type: integer
 *           example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated grocery shopping
 *               amount:
 *                 type: number
 *                 example: 60.00
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-17
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Expense not found
 */
  .put(ExpenseValidator.validateExpense, authMiddleware, ExpenseController.updateExpense);

router.route('/daily')
/**
 * @swagger
 * /api/v1/expenses/daily:
 *   get:
 *     summary: Retrieve daily expenses
 *     description: Get all expenses for the authenticated user grouped by day
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: Successfully retrieved daily expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 2025-09-16
 *                   totalAmount:
 *                     type: number
 *                     example: 120.75
 *                   expenses:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 11
 *                         title:
 *                           type: string
 *                           example: Coffee
 *                         amount:
 *                           type: number
 *                           example: 4.50
 */
  .get(authMiddleware, ExpenseController.getDailyExpenses);
  
export default router;
