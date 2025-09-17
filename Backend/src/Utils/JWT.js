// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

// utility function to generate tokens
export function generateToken(id, role, email) {
  return jwt.sign(
    { id, role, email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );
}


// utility function to verify tokens
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};