import User from '../Models/User.model.js';
import { AppError } from "../Utils/AppError.js";
import bcrypt, { hash } from 'bcrypt';

//done
export async function createUser(body) {
    const { name, email, password, rePassword, role, isActive } = body;
    if(password!== rePassword){
        throw new AppError('Passwords do not match', 400, 'Bad Request');
    }
    const user= await getUserByEmail(email);
    if (user) {
        throw new AppError('Email already exists', 409, 'Conflict');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password:hashedPassword, role, isActive});
    return newUser;
}

//done
export async function getUsers( page = 1, limit = 10 ) {    // paginated version
  if (limit === 0) {
    return await User.findAndCountAll({attributes:['id','name','email','isActive','role','createdAt', 'updatedAt']}); // fetch all
  }

  const offset = (page - 1) * limit;
  return await User.findAndCountAll({ limit, offset,
     attributes:['id','name','email','isActive','role','createdAt','updatedAt'] });
}

// done
export async function getUserById(id) {
    return await User.findByPk(id,{
        attributes:['id','name','email','isActive','role','createdAt','updatedAt']
    });
}

//done
export async function getUserByEmail(email) {
    return await User.findOne({
        where:{email},
        attributes:['id','name','email','isActive','role','createdAt','updatedAt']
    }); 
}

//done
export async function deleteUserById(id) {
    const user = await getUserById(id);
    if(!user) throw new AppError("User not found", 404, "No user found with the gived ID");
    await User.destroy({ where: { id }});
    return {id: user.id};
}

//done
export async function modifyUser(id, updateData) {
    const user = await getUserById(id);
    if(!user) throw new AppError("User not found", 404, "No user found with the given ID");
    await User.update(updateData, { where: { id } });
    user = await getUserById(id);
    return user;
}

//done
export async function deactivateUser(id) {
    const user = await getUserById(id);
    if(!user) return null;
    await User.update({ isActive: false }, { where: { id } });
    return user;
}

//done
export async function updatePassword(id, password1, newPassword) {
    const user = await User.findByPk(id);
    if(!user) throw new AppError("User not found", 404, "No user found with the given ID");
    const { password: password2 } = user;
    password2= hash(password2, process.env.SALT_ROUNDS);
    if(password1 !== password2) throw new AppError("password is incorrcet", 400, "password is incorrcet");
    await User.update({ password: newPassword }, { where: { id } });
    return user;
}