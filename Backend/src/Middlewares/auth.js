import { verifyToken } from '../Utils/JWT.js';

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = verifyToken(token);
    req.user = decoded; // attach to request for controllers to use
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
