import UserService from "../Services/User.service.js";

export async function getAllUsers(req, res){
    try{
        const users = await UserService.getAllUsers();
        res.status(200).json({ 
            success: true,
            message: "Users retrieved successfully", 
            data: users 
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error retrieving users'
        });
    }
}

export async function getUserById(req, res){
    const userId = req.params.id;
    try{
        const user = await UserService.getUserById(userId);
        if(!user){
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }
        res.status(200).json({ 
            success: true,
            message: "User retrieved successfully", 
            data: user 
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error retrieving user'
        });
    }
}

export async function deleteUserById(req, res){
    const userId = req.params.id;
    try{
        const deleted = await UserService.deleteUserById(userId);
        if(!deleted){
            return res.status(404).json({ 
                success: false,
                message: "User not found or already deleted" 
            });
        }
        res.status(200).json({ 
            success: true,
            message: "User deleted successfully" 
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error deleting user'
        });
    }
}
