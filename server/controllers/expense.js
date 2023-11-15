const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const rootDir = require("../util/path");
const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../util/database");

require("dotenv").config();

// api/expenses | METHOD - GET
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.session._id }).select(
      "amount description category"
    );
    if (!expenses) {
      return res.status(404).json({ message: "Expenses not found!" });
    }
    res.status(200).json(expenses);
  } catch (e) {
    console.log("message", e.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// api/expense | METHOD - POST
exports.postExpenses = async (req, res, next) => {
  const { amount, description, category } = req.body;

  const userId = req.session._id;

  const user = await User.findById(userId);
  let totalAmount = user.totalAmount;

  try {
    const updatedAmount = totalAmount + Number(amount);
    // create the expense
    const e = await Expense.create({
      amount: amount,
      description: description,
      category: category,
      userId: user._id,
    });

    // update the totalamount
    user.totalAmount = updatedAmount;
    await user.save();

    return res.status(201).json(e);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server Error!");
  }
};

// api/expense | METHOD - PUT

exports.putEditExpense = async (req, res, next) => {
  const { id, amount, description, category } = req.body;
  const userId = req.session._id;
  try {
    const user = await User.findById(userId);
    let totalAmount = user.totalAmount;

    const currExpense = await Expense.findById(id);

    user.totalAmount -= currExpense.amount;
    currExpense.amount = amount;
    user.totalAmount += currExpense.amount;

    currExpense.description = description;
    currExpense.category = category;
    currExpense.save();
    await user.save();
    res.status(200).json(currExpense);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal Server Error!");
  }
};

// api/delete | METHOD - DELETE
exports.deleteExpense = async (req, res, next) => {
  const expenseId = req.body.id;

  try {
    const userId = req.session._id;
    const user = await User.findById(userId);
    const currExpense = await Expense.findById(expenseId);

    if (!user || !currExpense) {
      return res.status(404).json({ error: "Resource not found" });
    }

    user.totalAmount -= currExpense.amount;
    await user.save(); // Save the updated user information

    await Expense.deleteOne({ _id: currExpense._id });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
