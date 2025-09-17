import express from 'express';        
import * as UserValidator from "../Middlewares/Validators/UserValidator.js";
// import * as UserController from "../Controllers/index.js";
import * as UserController from "../Controllers/User.controller.js";
import  authMiddleware  from '../Middlewares/auth.js';

const router= express.Router();

router.route('/users')
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: reteive all users
 *     description: retrieving all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successful getting users
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
    .get(authMiddleware, UserController.getUsers)
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: reteive all users
 *     description: retrieving all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successful getting users
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
    .post(UserValidator.validateCreation, authMiddleware, UserController.createUser);

router.route('/users/:id')
    .get(authMiddleware, UserController.getUserById)
    .put(UserValidator.validateModification, authMiddleware, UserController.updateUser)
    .delete(authMiddleware, UserController.deleteUserById);

export default router;
