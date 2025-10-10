// import { redisClient } from '../config/redis.config';
import jwt from 'jsonwebtoken';

import { v4 as uuidv4 } from "uuid";



// utility function to generate tokens
export function generateToken(secretKey, id, role, email, expiresIn) {
  return jwt.sign(
    { id, role, email },
    secretKey,
    { expiresIn } // Token expires in 1 hour
  );
}

// export async function issueRefreshToken(id, role, email, expiresIn) {
//   const tokenId = uuidv4();

//   // Store in Redis
//   await redisClient.set(`refreshToken:${tokenId}`, userId, {
//     EX: 7 * 24 * 60 * 60, // 7 days
//   });

//   // Sign JWT with tokenId
//   const refreshToken = generateToken(id, role, email, expiresIn);

//   return refreshToken;
// }

// utility function to verify tokens
export const verifyToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};