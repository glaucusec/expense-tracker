import React, { createContext, useState } from "react";

export const ExpensesContext = createContext({});

export default function ExpensesProvider(props) {
  const [expenses, setExpenses] = useState([]);

  const updateExpenseHandler = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpenseHandler = (_id) => {
    const newExpenses = expenses.filter((expense) => expense._id !== _id);
    setExpenses(newExpenses);
  };

  const setExpenseHandler = (expenses) => {
    setExpenses(expenses);
  };

  const expenseCtx = {
    expenses: expenses,
    setExpenseHandler: setExpenseHandler,
    deleteExpenseHandler: deleteExpenseHandler,
    updateExpenseHandler: updateExpenseHandler,
  };
  return <ExpensesContext.Provider value={expenseCtx}>{props.children}</ExpensesContext.Provider>;
}
