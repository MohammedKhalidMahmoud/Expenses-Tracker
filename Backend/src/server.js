// Import required modules
import express from 'express';         // Express framework for building the server
import cors from 'cors';              // CORS middleware for cross-origin requests
import dotenv from 'dotenv';          // Environment variables configuration
import UserRouter from './Routes/AuthRouter.js';    // Router for user-related endpoints
import ExpensesRouter from './Routes/ExpensesRouter.js'; // Router for expense-related endpoints
import * as database from './Models/database.js';    // Database configuration and utilities
import { syncTables } from './Models/sync.js'; // Function to synchronize database tables
// Load environment variables from .env file
dotenv.config();

// Initialize Express application
export const app = express();

// Get port from environment variables (default to 3000 if not specified)
const port = process.env.PORT;

// Apply middleware
app.use(cors());                      // Enable CORS for all routes
app.use(express.json());              // Parse incoming JSON requests

// Register route handlers
app.use('/api/auth', UserRouter);                  // Mount user routes
app.use('/api/expenses', ExpensesRouter);                // Mount expense routes

// Synchronize database tables (create/modify tables as needed)
database.tryConnection();
syncTables();

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
