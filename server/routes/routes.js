const express = require("express");

const router = express.Router();

const { isLoggedIn, isPremium } = require("../middleware/auth");

const passwordController = require("../controllers/password");
const premiumRouter = require("../controllers/premium");
const purchaseController = require("../controllers/purchase");
const userController = require("../controllers/user");
const expenseController = require("../controllers/expense");

// User Authentication
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/logout", isLoggedIn, userController.logOut);
router.get("/me", isLoggedIn, userController.me);

// Expenses
router.get("/expenses", isLoggedIn, expenseController.getExpenses);
router.post("/expense", isLoggedIn, expenseController.postExpenses);
router.delete("/expense", isLoggedIn, expenseController.deleteExpense);
router.put("/expense", isLoggedIn, expenseController.putEditExpense);

// Premium
router.post("/leaderboard", isPremium, premiumRouter.leaderBoard);
// router.get('/download-report', middleware.authenticate, premiumRouter.downloadReport);
// router.get('/fileurls', middleware.authenticate, premiumRouter.fileUrls);

// Premium Purchase
router.post("/premium", purchaseController.purchasePremium);
router.post("/updatetransactionstatus", purchaseController.updateTransactionStatus);

// Password Reset
router.get("/forgot-password", passwordController.getForgotPassword);
router.post("/forgot-password", passwordController.postForgotPassword);
router.get("/reset-password/:id", passwordController.getResetPassword);
router.post("/reset-password/", passwordController.postResetPassword);

module.exports = router;