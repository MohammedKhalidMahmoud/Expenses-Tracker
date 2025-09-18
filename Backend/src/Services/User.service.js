import User from '../Models/User.model.js';

export async function getUsers( page = 1, limit = 10 ) {    // paginated version
  if (limit === 0) {
    return await User.findAndCountAll({attributes:['id','name','email','isActive','role','createdAt', 'updatedAt']}); // fetch all
  }

  const offset = (page - 1) * limit;
  return await User.findAndCountAll({ limit, offset,
     attributes:['id','name','email','isActive','role','createdAt','updatedAt'] });
}

export async function getUserById(id) {
    return await User.findByPk(id,{
        attributes:['id','name','email','isActive','role','createdAt','updatedAt']
    });
}

export async function deleteUserById(id) {
    const user = await getUserById(id);
    if(!user) return null;

    await User.destroy({ where: { id }});
    return user;
}

export async function modifyUser(id, updateData) {
    const user = await getUserById(id);
    if(!user) return null;
    await User.update(updateData, { where: { id } });
    return user;
}

export async function deactivateUser(id) {
    const user = await getUserById(id);
    if(!user) return null;
    await User.update({ isActive: false }, { where: { id } });
    return user;
}

export async function updatePassword(id, newPassword) {
    const user = await getUserById(id);
    if(!user) return null;
    await User.update({ password: newPassword }, { where: { id } });
    return user;
}