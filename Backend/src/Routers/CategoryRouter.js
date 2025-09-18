import express from "express";
import * as CategoryController  from '../Controllers/Category.controller.js';
import { authMiddleware } from '../Middlewares/auth.js';
import { requireAdminRole } from '../Middlewares/role.js';


const router=express.Router();

router.route('/')
/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *   summary: Retrieve all categories for the authenticated user
 *   description: Returns a list of categories belonging to the logged-in user
 *   tags:
 *    - Categories
 *   responses:
 *    200:
 *    description: Successfully retrieved categories
 *   content:
 *    application/json:
 *   schema:
 *    type: array
 *   items:
 *    type: object
 *   properties:
 *    id: 
 *     type: string
 *     example: "550e8400-e29b-41d4-a716-446655440000"
 *    name:
 *     type: string
 *     example: "Food"
 *    type:
 *     type: string
 *     example: "global"
 *    userId:
 *     type: integer
 *     example: 1
 */
.get(authMiddleware, requireAdminRole, CategoryController.getCategories)   //retrieve the categories of the authenticated user
.post(authMiddleware, requireAdminRole, CategoryController.createCategory); // Admin can create a new category

router.route('/:id')
.get(authMiddleware, CategoryController.getCategoryById)   //retrieve the category by categoryId
.put(authMiddleware, CategoryController.updateCategory) // user can update the category details by categoryId 
.delete(authMiddleware, CategoryController.deleteCategory); // Admin can delete hiw own custom categories by categoryId

export default router;