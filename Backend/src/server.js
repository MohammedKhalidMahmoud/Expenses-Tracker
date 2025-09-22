// Import required modules
import express from 'express';         // Express framework for building the server
import cors from 'cors';              // CORS middleware for cross-origin requests
import dotenv from 'dotenv';          // Environment variables configuration
// import { bodyParser } from 'body-parser'; // Middleware to parse request bodies
import * as database from './Models/database.js';    // Database configuration and utilities
import { syncTables } from './Models/sync.js'; // Function to synchronize database tables
import { globalErrorHandler } from './Middlewares/GlobalErrorHandler.js'; // Global error handling middleware
import { registerRouteHandlers } from './Utils/RouteHandlers.js';
import { configureSwagger } from './Utils/Swagger.js';
// Load environment variables from .env file
dotenv.config();

// Initialize Express application
export const app = express();

// Swagger configuration
configureSwagger(app);

app.use(cors());                      // Enable CORS for all routes
app.use(express.json());              // Parse incoming JSON requests

// Register route handlers
registerRouteHandlers(app);

// Get port from environment variables (default to 3000 if not specified)
const port = process.env.PORT || 3000;

// Apply middleware

app.use(globalErrorHandler);


// Synchronize database tables (create/modify tables as needed)
database.tryConnection();
syncTables();

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
