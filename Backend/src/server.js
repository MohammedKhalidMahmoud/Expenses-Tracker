// Import required modules
import express from 'express';         // Express framework for building the server
import cors from 'cors';              // CORS middleware for cross-origin requests
import dotenv from 'dotenv';          // Environment variables configuration
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {UserRouter, AuthRouter, ExpensesRouter} from './Routers/index.js'; // Importing route handlers
import * as database from './Models/database.js';    // Database configuration and utilities
import { syncTables } from './Models/sync.js'; // Function to synchronize database tables
import { globalErrorHandler } from './Middlewares/GlobalErrorHandler.js'; // Global error handling middleware
// Load environment variables from .env file
dotenv.config();

// Initialize Express application
export const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change if needed
      },
    ],
  },
  apis: ["./routers/*.js"], // path to your API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Get port from environment variables (default to 3000 if not specified)
const port = process.env.PORT || 3000;

// Apply middleware
app.use(cors());                      // Enable CORS for all routes
app.use(express.json());              // Parse incoming JSON requests

// Register route handlers
app.use('/api/v1/auth', AuthRouter);                  // Mount user routes
app.use('/api/v1/expenses', ExpensesRouter);                // Mount expense routes
app.use('/api/v1/users', UserRouter);                // Mount user routes

app.use(globalErrorHandler);
// Synchronize database tables (create/modify tables as needed)
database.tryConnection();
syncTables();

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
