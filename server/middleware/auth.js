require("dotenv").config();

exports.isLoggedIn = (req, res, next) => {
  if (!req?.session?.logged) {
    return res.status(403).json({ message: "UnAuthorized. Access Denied!" });
  } else {
    next();
  }
};

exports.isPremium = (req, res, next) => {
  if (!req?.session?.isPremiumUser) {
    return res.status(403).json({ message: "UnAuthorized. You are not a premium user!" });
  } else {
    next();
  }
};
