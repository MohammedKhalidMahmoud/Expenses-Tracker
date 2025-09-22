
import { Op } from 'sequelize';
import Category from '../Models/Category.model.js';
import User from '../Models/User.model.js';
import { AppError } from '../Utils/AppError.js';


export async function getCategoryById(categoryId) {
    return await Category.findOne({where: 
        {id: categoryId}
    });
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
export async function modifyCategory(categoryId, userId, updateData) {
    const category= getCategoryById(categoryId, userId);
    if(!category) return null;
    await Category.update(updateData, { where: { id: categoryId } });
    return category;
}

export async function deleteCategory(categoryId, userId) {
    const user = User.findByPk(userId);
    if(Category.findByPk(categoryId).type==='global' && user.role !=='admin'){
        throw new AppError('Only admin can delete global categories', 403, 'FORBIDDEN');
    }
    const category= getCategoryById(categoryId);
    if(!category) return null;
    await Category.destroy({ where: { id: categoryId } });
    return category;
}

export async function createCategory(userId, data) {
    const user = await User.findByPk(userId);
    if(data.type==='global' && user.role !=='admin'){
        throw new AppError('Only admins can carete global categories', 403, 'FORBIDDEN');
    }
    const category= await getCategoryById(data.id);
     
    if(category) throw new AppError('Category with this ID already exists', 409, 'CONFLICT');
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