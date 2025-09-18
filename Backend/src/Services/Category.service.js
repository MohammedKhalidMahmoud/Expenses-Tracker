
import { Op } from 'sequelize';
import Category from '../Models/Category.model.js';


export async function getCategoryById(categoryId, userId) {
    return await Category.findOne({where: 
        {id: categoryId, 
            [Op.or]:
                { type: 'global',
                  userId
                }
        }
    });
}
export async function getCategories(userId) {
    return await Category.findAll({where: 
        { 
            [Op.or]:
                { type: 'global',
                    userId
                }
        }
    });
}
export async function modifyCategory(categoryId, userId, updateData) {
    const category= getCategoryById(categoryId, userId);
    if(!category) return null;
    await Category.update(updateData, { where: { id: categoryId } });
    return category;
}

export async function deleteCategory(categoryId, userId) {
    const category= getCategoryById(categoryId, userId);
    if(!category) return null;
    await Category.delete({ where: { id: categoryId } });
    return category;
}
export async function createCategory(categoryId, userId, data) {
    const category= getCategoryById(categoryId, userId);
    if(!category) return null;
    await Category.craete(data, { where: { id: categoryId } });
    return category;
}