import User from '../Models/User.model.js';

export async function getUsers({ page = 1, limit = 10 }) {    // paginated version
  if (limit === 0) {
    return User.findAndCountAll({attributes:['id','name','email','isActive','role','createdAt', 'updatedAt']}); // fetch all
  }

  const offset = (page - 1) * limit;
  return User.findAndCountAll({ limit, offset,
     attributes:['id','name','email','isActive','role','createdAt','updatedAt'] });
}

export function getUserById(id) {
    return User.findByPk(id,{
        attributes:['id','name','email','isActive','role','createdAt','updatedAt']
    });
}


export function deleteUserById(id) {
    return User.destroy({ where: { id }, attributes:['id','name','email','isActive','role','createdAt','updatedAt'] });
}

export function modifyUser(id, updateData) {
    return User.update(updateData, { where: { id }, 
        attributes:['id','name','email','isActive','role','createdAt','updatedAt'] });
}

export function deactivateUser(id) {
    return User.update({ isActive: false }, { where: { id }, 
        attributes:['id','name','email','isActive','role','createdAt','updatedAt'] });
}

export function updatePassword(id, newPassword) {
    return User.update({ password: newPassword }, { where: { id }, 
        attributes:['id','name','email','isActive','role','createdAt','updatedAt'] });
}