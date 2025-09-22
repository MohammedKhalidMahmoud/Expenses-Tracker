import Category from '../Models/Category.model.js';
import * as CategoryService from '../Services/Category.service.js';
import { errorResponse, successResponse } from '../Utils/resposne.js';


export function getCategoryById(req, res) {
    const { categoryId } = req.params;
    const category= CategoryService.getCategoryById(id);
    if(!category){
       return errorResponse(res, "Category not found", 404, "No category with the given ID");
    }
    return successResponse(res, "Category retrieved successfully", category, 200);
}

export function getCategories(req,res){
    const userId = req.user.id;
    const categories= CategoryService.getCategories(userId);
    if(categories) return successResponse(res, "Categories retrieved successfully", categories, 200);
    else return errorResponse(res, "No categories found", 404, "No categories found for this user");
}

export function updateCategory(req, res) {
    const { categoryId } = req.params;
    const userId = req.user.id;
    const updateData = req.body;
    const updatedCategory= CategoryService.updateCategory(categoryId, userId, updateData);
    if(updatedCategory){
        return successResponse(res, "Category updated successfully", updatedCategory, 200);
    }
    else{
        return errorResponse(res, "Category not found", 404, "No category with the given ID for this user");
    }
}


export function deleteCategory(req, res) {
    const { categoryId } = req.params;
    const userId = req.user.id;
    const deletedCategory= CategoryService.deleteCategory(categoryId, userId);
    if(deletedCategory){
        return successResponse(res, "Category deleted successfully", deletedCategory, 200);
    }
    else{
        return errorResponse(res, "Category not found", 404, "No category with the given ID for this user");
    }
}

export function createCategory(req, res) {
    const { categoryId } = req.params;
    const userId = req.user.id;
    const data = req.body;
    const postedCategory= CategoryService.createCategory(categoryId, userId, data);
    if(postedCategory){
        return successResponse(res, "Category updated successfully", postedCategory, 200);
    }
    else{
        return errorResponse(res, "Category not found", 404, "No category with the given ID for this user");
    }
}


export async function getAllCategories(req, res) {
    try {
        const categories = await CategoryService.getAllCategories();
        if(!categories) {
            return errorResponse(res, "No categories found", 404, "No categories available");
        }
        return successResponse(res, "All categories retrieved successfully", categories, 200);
    } catch (error) {
        return errorResponse(res, "Failed to retrieve categories", 500, error.message);
    }
}

