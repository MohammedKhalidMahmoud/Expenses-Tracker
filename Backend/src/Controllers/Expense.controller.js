
import Expense from "../Models/Expense.model.js";
import handleErrorResponse from "../Utils/AppError.js"
import verifyToken from "../Utils/JWT.js"
import * as ExpenseService from "../Services/Expense.service.js";

export async function getExpensesById(req, res) {
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


export const createExpense = async (req, res) => {
  try {
    const token = req.headers.token;
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
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    // console.log(user.id);
    // console.log(+req.params.id);
    const [updated] = await Expense.update(req.body, {
      where: { id: +req.params.id, userId: user.id }
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
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const user = verifyToken(token);
    const deleted = await ExpenseService.deleteExpenseById(req.params.id, user.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Expense not found or not owned by user" });
    }

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
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
        res.status(500).json({ 
            error: 'Server error',
            message: err.message 
        });
    }
}