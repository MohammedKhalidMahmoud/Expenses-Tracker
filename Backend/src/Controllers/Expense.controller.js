
// import Expense from "../Models/Expense.model.js";
import { Expense, User } from "../Models/index.js"
import { verifyToken } from "../Utils/JWT.util.js"
import * as ExpenseService from "../Services/Expense.service.js";
import { errorResponse, successResponse } from "../Utils/resposne.js";
import { AppError } from "../Utils/AppError.js";


export async function getAllExpenses(req, res){ // done
  try{
    const expenses= await ExpenseService.getAllExpenses();
    return successResponse(res, "Expenses retrieved successfully", expenses, 200)
  }
  catch(error){
    return errorResponse(res, "error retreving expenses", 500, error.message);
  } 
}

export async function getExpenses(req, res) { // retrieve the expenses associated with a certain user
  const userId= req.user.id;
  const user= User.findByPk(userId);
  if(user.role=== 'admin') 
    return errorResponse(res, "Error retrieving expenses" , 400, "admins do not have associated expenses")
  // console.log(userId);
  try{
    const expenses= await ExpenseService.getExpenses(userId);
    return successResponse(res, "Associated Expenses Retrieved successfully", expenses, 200);
  }
  catch(error){
    return errorResponse(res, "Error Retrieving expenses", null,   )
    // throw new AppError(error.message || 'Error fetching expenses', error.statusCode, error.status);
  }
}

export async function getExpenseById(req, res) {
  try {
    const token = req.headers['token'];
    
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    // Verify token synchronously and get the decoded user
    const user = verifyToken(token)
    console.log(user);
    // If you need to use the user information for filtering expenses:
    // const expenses = await Expense.findAll({ where: { userId: user.id } });
    
    const expenses = await Expense.findAll({where: { userId: user.id }});
    
    console.log("Fetched all expenses successfully");
    return successResponse(res, "Expenses retrieved successfully", expenses, 200)
    
  } catch (error) {
    console.error("Error in getAllExpenses:", error);
    return errorResponse(res, "Failed to retrieve expenses", 500,error.message)
  }
}


export const createExpense = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    const newExpense = await Expense.create({
      ...req.body,
      userId: user.id // Associate expense with user
    });
    return successResponse(res, "Expense created successfully", newExpense, 201 )
  } catch (error) {
    throw new AppError(error.message || 'Error creating expense', error.statusCode, error.status);
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    // console.log(user.id);
    // console.log(+req.params.id);
    const [updated] = await Expense.update(req.body, {
      where: { id: +req.params.id, userId: user.id }
    });

    if (!updated) {
      return errorResponse(res, "Expense not found or not owned by user", 404, error.message);
    }

    const updatedExpense = await Expense.findByPk(req.params.id);
    res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
    const err= new AppError(error.message || 'Error updating Expense', error.statusCode, error.status);
    throw err;
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const user = verifyToken(token);
    const deleted = await ExpenseService.deleteExpenseById(req.params.id, user.id);

    if (!deleted) {
      return errorResponse(res, "Expense not found or not owned by user", 404, error.message);
    }
    return successResponse(res, "Expense deleted successfully", deleted, 200);
  } catch (error) {
    const err= new AppError(error.message || 'Error deleting expense', error.statusCode, error.status);
    throw err;
  }
};

// Error handler utility


export async function getDailyExpenses(req, res) {
   try {
        // const requestedDate = parseDateParam(req.query.date, new Date());
        // const startOfDay = new Date(requestedDate);
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);
        
        const expenses = await Expense.findAll({
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        
        res.json(expenses);
    } catch (err) {
        const error = new AppError(err.message || 'Server error', err.statusCode, err.status);
        throw error;
    }
}