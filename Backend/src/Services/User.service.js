import User from '../Models/User.model.js';

export async function getUsers({ page = 1, limit = 10 }) {    // paginated version
  if (limit === 0) {
    return User.findAndCountAll(); // fetch all
  }

  const offset = (page - 1) * limit;
  return User.findAndCountAll({ limit, offset });
}

export function getUserById(id) {
    return User.findByPk(id);
}

export function deleteUserById(id) {
    return User.destroy({ where: { id } });
}

export function modifyUser(id, updateData) {
    return User.update(updateData, { where: { id } });
}

export function deactivateUser(id) {
    return User.update({ isActive: false }, { where: { id } });
}

export function updatePassword(id, newPassword) {
    return User.update({ password: newPassword }, { where: { id } });
}