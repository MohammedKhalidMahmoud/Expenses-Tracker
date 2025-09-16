import * as AuthValidator from '../Middlewares/Validators/AuthValidator.js';
import * as AuthController from '../Controllers/Auth.controller.js';
import authMiddleware  from '../Middlewares/auth.js';
import express from 'express';
// import { type } from './../../node_modules/@types/json-schema/index.d';
// import { CommanderError } from './../../node_modules/z-schema/node_modules/commander/typings/index.d';

const router= express.Router();


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: User logs in using email and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *      schema:
 *        type: object
 *        properties:
 *         email:
 *          type: string
 *          example: test@gmail.com
 *        password:
 *         type: string
 *         example: test@123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: mkhaled@gmail.com
 *                   createdAt:
 *                     type: string
 *                     example: 10-10-2010
 *                   updatedAt:
 *                     type: string
 *                     example: 10-10-2010
 */

router.post('/login', AuthValidator.validateLogin, AuthController.login);
router.post('/signup', AuthValidator.validateSignup, AuthController.signup);
router.post('/resetpassword', authMiddleware, AuthValidator.validateResetPassword, AuthController.resetPassword);


export default router;


