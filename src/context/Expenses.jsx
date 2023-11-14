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

  const editExpenseHandler = (updatedExpense) => {
    const filteredExpenses = expenses.map((expense) => {
      if (expense._id === updatedExpense._id) {
        expense.description = updatedExpense.description;
        expense.amount = updatedExpense.amount;
        expense.category = updatedExpense.category;
      }
      return expense;
    });

    setExpenses(filteredExpenses);
  };

  const setExpenseHandler = (expenses) => {
    setExpenses(expenses);
  };

  const expenseCtx = {
    expenses: expenses,
    setExpenseHandler: setExpenseHandler,
    deleteExpenseHandler: deleteExpenseHandler,
    editExpenseHandler: editExpenseHandler,
    updateExpenseHandler: updateExpenseHandler,
  };
  return <ExpensesContext.Provider value={expenseCtx}>{props.children}</ExpensesContext.Provider>;
}
