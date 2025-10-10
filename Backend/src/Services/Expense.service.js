
import Expense from "../Models/Expense.model.js";
import { AppError } from "../Utils/AppError.js";

export async function deleteExpenseById(id){
    const expense= await Expense.findByPk(id);
    if(!expense) throw new AppError("Expense not found", 404, "No expense found with the given ID");
    await Expense.destroy({ where: { id } });
    return {id: expense.id};
}

export async function getAllExpenses(){
    const expenses= await Expense.findAll();
    return expenses;
}
export async function getExpensesById(userId){
    return await Expense.findAll({where: { userId }});
}

export async function getExpenses(userId) { // retrieve the user's associated expenses
    const expenses=await ExpenseService.getExpenses({
      where:{
        userId
      }
    });
    return expenses;
  }
  

//done
export async function createExpense(expenseData){
    const newExpense= await Expense.create(expenseData);
    return newExpense;
}

//done
export async function updateExpense(id, updatedData){
    const expense= await Expense.findByPk(id);
    if(!expense) throw new AppError("Expense not found", 404, "Ne expense found with the given ID");

    await Expense.update(updatedData, { where: { id } });
    expense= await Expense.findByPk(id);
    return expense;
}