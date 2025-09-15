// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

export function generateToken(email, id) {
  return jwt.sign(
    { email, id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );
}

export async function authenticateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("Token verification failed:", err);
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

// Helper function to verify token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};