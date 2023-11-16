const bcrypt = require("bcrypt");

const User = require("../models/user");

require("dotenv").config();

exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const saltrounds = 10;
  try {
    // check if the user exists?
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(403).json({ error: "Email is already taken" });
    }
    //  create the password hash and Create the NEW user.
    const hash = await bcrypt.hash(password, saltrounds);
    const userCreated = await User.create({ name: name, email: email, password: hash });
    if (userCreated) {
      res.status(200).send({ userCreated: true });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Missing Username or Password");
  }

  try {
    // check for user exists or not!
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // check password hash
    const passwordsMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordsMatch) {
      return res.status(403).json({ error: "Invalid Credentials" });
    }

    req.session.logged = true;
    req.session.name = userExists.name;
    req.session._id = userExists._id;
    req.session.isPremiumUser = userExists.isPremiumUser;

    return res.json({
      message: "User login Successful",
      success: true,
      name: userExists.name,
      isPremiumUser: userExists.isPremiumUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logOut = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(`Error destroying session: ${err}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ success: true, message: "Logout successful" });
  });
};

exports.me = async (req, res, next) => {
  res.json({
    success: true,
    name: req.session.name,
    isPremiumUser: req.session.isPremiumUser,
  });
};
