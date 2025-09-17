import express from 'express';        
import * as UserValidator from "../Middlewares/Validators/UserValidator.js";
// import * as UserController from "../Controllers/index.js";
import * as UserController from "../Controllers/User.controller.js";
import {authMiddleware} from '../Middlewares/auth.js';
import { requireAdminRole } from '../Middlewares/role.js';
const router = express.Router();

router.route('/')
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all registered users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved users
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
 *                     example: johndoe@email.com
 *                   createdAt:
 *                     type: string
 *                     example: 2025-09-15T10:00:00Z
 *                   updatedAt:
 *                     type: string
 *                     example: 2025-09-16T12:00:00Z
 */
    .get(authMiddleware, requireAdminRole, UserController.getUsers)

router.route('/:id')
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their unique ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@email.com
 *       404:
 *         description: User not found
 */
    .get(authMiddleware, UserController.getUserById)
/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user
 *     description: Update an existing user's information
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               email:
 *                 type: string
 *                 example: updated@email.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 */
    .put(UserValidator.validateModification, authMiddleware, UserController.updateUser)
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user by their unique ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
    .delete(authMiddleware, UserController.deleteUserById)
/**
 * @swagger
 * /api/v1/users/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a user
 *     description: Sets a user's account as inactive without deleting it.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to deactivate
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deactivated successfully
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
 *                       example: johndoe@email.com
 *                     isActive:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-17T10:00:00Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-17T11:00:00Z
 *       401:
 *         description: Unauthorized – missing or invalid token
 *       404:
 *         description: User not found
 */
    // .patch('/deactivate', authMiddleware, UserController.deactivateUser)
    // .patch('/activate', authMiddleware, requireAdminRole, UserController.deactivateUser);
export default router;
