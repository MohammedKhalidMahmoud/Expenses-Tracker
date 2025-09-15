import { getExpensesById } from "../Controllers/Expense.controller";
import Expense from "../Models/Expense.model.js";

export async function deleteExpenseById(id){
    return Expense.destroy({ where: { id } });
}

export async function getExpensesById(userId){
    return Expense.findAll({where: { userId }});
}

export async function getAllExpense(){
    return await Expense.findAll();
}

export async function createExpense(expenseData){
    return Expense.create(expenseData);
}

export async function updateExpense(id, updatedData){
    return Expense.update(updatedData, { where: { id } });
}