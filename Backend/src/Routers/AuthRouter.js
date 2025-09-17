import * as AuthValidator from '../Middlewares/Validators/AuthValidator.js';
import * as AuthController from '../Controllers/Auth.controller.js';
import {authMiddleware} from '../Middlewares/auth.js';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user using email and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: test@123
 *     responses:
 *       200:
 *         description: Successful login, returns user info and access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: mkhaled@gmail.com
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     role:
 *                       type: string
 *                       exmaple: user
 *                     createdAt:
 *                       type: string
 *                       example: 2025-01-01 12:00:00
 *                     updatedAt:
 *                       type: string
 *                       example: 2025-01-01 12:00:00
 */
router.post('/login', AuthValidator.validateLogin, AuthController.login);

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - rePassword
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mohamed Khaled
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: test@123
 *               rePassword:
 *                 type: string
 *                 example: test@123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Mohamed Khaled
 *                 email:
 *                   type: string
 *                   example: test@gmail.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 role:
 *                   type: string
 *                   exmaple: user
 *                 createdAt:
 *                   type: string
 *                   example: 2025-01-01 12:00:00
 *                 updatedAt:
 *                   type: string
 *                   example: 2025-01-01 12:00:00
 */
router.post('/signup', AuthValidator.validateSignup, AuthController.signup);

/**
 * @swagger
 * /api/v1/auth/resetpassword:
 *   post:
 *     summary: Reset user password
 *     description: Allows an authenticated user to reset their password
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: test@123
 *               newPassword:
 *                 type: string
 *                 example: NewPassw0rd!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       401:
 *         description: Unauthorized - invalid or missing token
 */
router.post(
  '/resetpassword',
  authMiddleware,
  AuthValidator.validateResetPassword,
  AuthController.resetPassword
);

export default router;
