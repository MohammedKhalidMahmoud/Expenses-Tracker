Overview
Expenses Tracker is a full-stack web application designed to help users monitor and manage their expenses efficiently. The application features:

Frontend: Built with React, Tailwind CSS, and Vite for a fast, responsive interface

Backend: Powered by Node.js and Express.js with JWT authentication

Database: MySQL managed with Sequelize ORM for robust data handling

Features
Authentication & Authorization
User registration and login using JWT (JSON Web Tokens)

Protected routes based on user roles

Secure password storage with bcrypt hashing

Expense Management
Add, view, edit, and delete expenses

Categorize expenses for better tracking

Filter and sort expenses by date, amount, or category

Dashboard with expense summaries and visualizations

Technologies Used
Frontend
React (via Vite)

Tailwind CSS for styling

React Router for navigation

Axios for API calls

Context API for state management

Backend
Node.js with Express.js

Sequelize ORM for MySQL

JWT for authentication/authorization

Bcrypt for password hashing

Dotenv for environment variables

Project Structure
expenses-tracker/
├── Backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── Controllers/    # Business logic
│   │   ├── Middlewares/    # Auth middleware, error handlers
│   │   ├── Models/         # Sequelize models
│   │   ├── Routes/         # API endpoints
│   │   ├── Utils/          # Helper functions
│   │   └── server.js       # Server entry point
│   ├── .env                # Environment variables
│   ├── package.json
│   └── README.md
│
└── Frontend/App/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── assets/         # Static files
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React context providers
    │   ├── App.css
    │   ├── App.jsx         # Main component
    │   ├── index.css
    │   ├── main.jsx        # Entry point
    │   └── ...
    ├── .gitignore
    ├── package.json
    └── vite.config.js
Installation
Prerequisites
Node.js (v16 or higher)

MySQL server

npm or yarn
