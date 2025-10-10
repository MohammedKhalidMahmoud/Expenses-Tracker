
import { Op } from 'sequelize';
import Category from '../Models/Category.model.js';
import User from '../Models/User.model.js';
import { AppError } from '../Utils/AppError.js';


export async function getCategoryById(categoryId) {
    const category= await Category.findOne({where: 
        {id: categoryId}
    });
    return category;
}
export async function getCategories(userId) {
    let categories;
    
    categories= await Category.findAll({where: 
        { 
            [Op.or]:[
                { type: 'global'},
                { userId }
            ]
        }
    });
    return categories;
}
export async function updateCategory(categoryId, userId, updateData) {
    const user = User.findByPk(userId);
    const category= Category.findByPk(categoryId)
    if(!category) return null;
    if(category.type==='global' && user.role !=='admin'){
        throw new AppError('Only admins can modify global categories', 403, 'FORBIDDEN');
    }
    if(category.type==='custom' && user.id!==category.userId){
        throw new AppError('Only the user can delete his own custom categories', 403, 'FORBIDDEN');
    }
    
    await Category.update(updateData, { where: { id: categoryId } });
    return category;
}

export async function deleteCategory(categoryId, userId) {
    const user = await User.findByPk(userId); 
    const category= await getCategoryById(categoryId);
    if(!category) return null;
    if(category.type==='global' && user.role !=='admin'){
        throw new AppError('Only admins can delete global categories', 403, 'FORBIDDEN');
    }
    if(category.type==='custom' && user.id!==category.userId){
        throw new AppError('Only user can delete this associated custom categories', 403, 'FORBIDDEN');
    }
    await Category.destroy({ where: { id: categoryId } });
    // console.log(category);
    return {id: category.id};
}

export async function createCategory(userId, data) {
    const user = await User.findByPk(userId);
    if(data.type==='global' && user.role !=='admin'){
        throw new AppError('Only admins can carete global categories', 403, 'FORBIDDEN');
    }
    // Create new category
    const newCategory = await Category.create({
    ...data,
    userId: data.type === "custom" ? userId : null, // attach user only for custom categories
  });
//   console.log(newCategory);
  return newCategory;
}

export async function getAllCategories(req, res) {
    return await Category.findAll();
}