import { AppError } from "../Utils/AppError.js";

export function requireAdminRole(req, res, next) {
    if(req.user.role!=='admin'){
        throw new AppError('Admin role required', 403, 'FORBIDDEN');
    }
    next();
}