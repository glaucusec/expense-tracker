Expense = require("../models/expense");

const getExpenses = async (_id) => {
  const expenses = await Expense.find({ userId: _id });
  return expenses;
};

const generateOTP = () => {
  const otpLength = 6;
  const minDigitValue = Math.pow(10, otpLength - 1);
  const maxDigitValue = Math.pow(10, otpLength) - 1;

  // Generate a random number within the specified range
  const randomOTP = Math.floor(Math.random() * (maxDigitValue - minDigitValue + 1)) + minDigitValue;

  return randomOTP.toString(); // Convert to string to ensure leading zeros are included if any
};

module.exports = {
  getExpenses,
  generateOTP,
};
