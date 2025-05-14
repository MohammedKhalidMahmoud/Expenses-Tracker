// export function check_required_fields(name, email, password)  {
//     if(!name) return res.status(400).json({
//         error: 'Name is required',
//         message: 'Please provide a name'
//     });
//     if(!email) return res.status(400).json({
//         error: 'email is required',
//         message: 'Please provide a email'
//     });
//     if(!password) return res.status(400).json({
//         error: 'password is required',
//         message: 'Please provide a password'
//     });
// }

//   .post(ExpensValidator.validateExpense, ExpensController.createExpense)
//   .put(ExpensController.updateAllExpenses)
//   .delete(ExpensController.deleteAllExpenses);
// import { authenticateToken } from "../Utils/JWT.js";


// import jwt from "jsonwebtoken";
// import Expense from "../models/expens.model.js";
// export async function getAllExpenses(req, res) {
//   const token = req.headers['token'];
//   console.log("HI");

//     // authenticateToken(token);
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//           if (err) {
//             console.error("Token verification failed:", err);
//             return;
//           }
//   });

//   Expense.findAll()
//     .then(expenses => {
//       console.log("Fetched all expenses successfully:", expenses);
//       res.status(200).json({ message: "GET all expenses", data: expenses });
//     })
//     .catch(error => {
//       console.error("Error fetching expenses:", error);
//       res.status(500).json({ message: "Error fetching expenses" });
//     });
// }

import jwt from "jsonwebtoken";
import Expense from "../models/expens.model.js";

export async function getAllExpenses(req, res) {
  try {
    const token = req.headers['authorization']?.split(' ')[1] || req.headers['token'];
    
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    // Verify token synchronously and get the decoded user
    const user = jwt.verify(token, process.env.JWT_SECRET);
    
    // If you need to use the user information for filtering expenses:
    // const expenses = await Expense.findAll({ where: { userId: user.id } });
    
    const expenses = await Expense.findAll();
    
    console.log("Fetched all expenses successfully");
    res.status(200).json({ 
      success: true,
      message: "Expenses retrieved successfully", 
      data: expenses 
    });
    
  } catch (error) {
    console.error("Error in getAllExpenses:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: "Invalid or expired token" 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to retrieve expenses",
      error: error.message 
    });
  }
}



// Helper function to verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

// Get all expenses (with optional user filtering)


// Get single expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    const expense = await Expense.findOne({
      where: { id: req.params.id, userId: user.id }
    });

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Create new expense
export const createExpense = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    const newExpense = await Expense.create({
      ...req.body,
      userId: user.id // Associate expense with user
    });

    res.status(201).json({ success: true, data: newExpense });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    const [updated] = await Expense.update(req.body, {
      where: { id: req.params.id, userId: user.id }
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Expense not found or not owned by user" });
    }

    const updatedExpense = await Expense.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    const deleted = await Expense.destroy({
      where: { id: req.params.id, userId: user.id }
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Expense not found or not owned by user" });
    }

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Error handler utility
const handleErrorResponse = (res, error) => {
  console.error(error);
  if (error.message.includes("token")) {
    return res.status(401).json({ success: false, message: error.message });
  }
  res.status(500).json({ success: false, message: "Server error", error: error.message });
};