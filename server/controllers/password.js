const path = require("path");
const rootDir = require("../util/path");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const ForgotPassword = require("../models/forgot-password");
const sequelize = require("../util/database");

const UserServices = require("../services/userservices");

require("dotenv").config();

exports.getResetPassword = async (req, res, next) => {
  const OTP = req.params.id;
  try {
    const UData = await ForgotPassword.findOne({ token: OTP });
    if (UData.isActive) {
      return res.status(200).json({ active: true, otp: UData.token });
    }
    return res
      .status(400)
      .json({ active: false, error: "Invalid OTP", message: "The provided OTP is not valid." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.postResetPassword = async (req, res, next) => {
  const UUID = req.body.otp;
  const saltrounds = 10;
  const password1 = req.body.password1;
  const password2 = req.body.password2;

  if (password1 !== password2) {
    return res.status(403).json({ message: "Passwords Does Not Match" });
  }
  try {
    const token = await ForgotPassword.findOne({ token: UUID }).select("isActive userId");
    if (!token.isActive) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hash = await bcrypt.hash(password1, saltrounds);

    await User.updateOne({ _id: token.userId }, { password: hash });
    
    token.isActive = false;
    await token.save();

    res.status(201).json({ message: "Password Updated Successfully " });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getForgotPassword = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "forgot-password.html"));
};

exports.postForgotPassword = async (req, res, next) => {
  // await ForgotPassword.deleteMany();
  const user_email = req.body.email;
  try {
    const OTP = UserServices.generateOTP();
    const user = await User.findOne({ email: user_email }).select("_id email");
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }
    await ForgotPassword.create({ token: OTP, isActive: true, userId: user._id });
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.EMAILTOKEN;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "{{params.subject}}";
    sendSmtpEmail.htmlContent =
      "<html><body><h3>Here is your OTP to reset password<h3><h1>{{params.OTP}}</h1></body></html>";
    sendSmtpEmail.sender = { name: "Expense Tracker", email: "expensetracker@gmail.com" };
    sendSmtpEmail.to = [{ email: user_email, name: "Sharpener Test" }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { OTP: OTP, subject: "Reset Password" };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
