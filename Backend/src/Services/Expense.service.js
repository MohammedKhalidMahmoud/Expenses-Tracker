
import Expense from "../Models/Expense.model.js";

export async function deleteExpenseById(id){
    return Expense.destroy({ where: { id } });
}

export async function getExpensesById(userId){
    return Expense.findAll({where: { userId }});
}

export async function getExpenses({ page = 1, limit = 10 }) {    // paginated version
  if (limit === 0) {
    return Expense.findAndCountAll(); // fetch all
  }
  const offset = (page - 1) * limit;
  return Expense.findAndCountAll({ limit, offset});
}

export async function createExpense(expenseData){
    return Expense.create(expenseData);
}

export async function updateExpense(id, updatedData){
    return Expense.update(updatedData, { where: { id } });
}