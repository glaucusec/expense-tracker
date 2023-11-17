Expense = require("../models/expense");

const getExpenses = async (_id) => {
  const expenses = await Expense.find({ userId: _id });
  return expenses;
};

module.exports = {
  getExpenses,
};
