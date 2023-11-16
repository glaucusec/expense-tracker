const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
console.log(process.env.ORIGIN_SERVER);

const apiRoutes = require("./routes/routes");

User = require("./models/user");
Expense = require("./models/expense");
Order = require("./models/order");
ForgotPasswordRequest = require("./models/forgot-password");
filesUploaded = require("./models/filesuploaded");

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_SERVER,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: { sameSite: "none", secure: true },
  })
);

// app.use(
//   helmet({
//     contentSecurityPolicy: false, // disable the CSP middleware
//     referrerPolicy: true,
//     crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: {
//       allowOrigins: ["*"],
//     },
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["*"],
//         scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
//       },
//     },
//   })
// );
// app.use(helmet({
//     contentSecurityPolicy: false, // disable the CSP middleware
//     referrerPolicy: true, // disable the Referrer-Policy middleware
//     crossOriginResourcePolicy: {
//         allowOrigins: ['*']
//      }
//   }));

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use("/api/", apiRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/login.html`));
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_SERVER);
    console.log("DB connected");
    app.listen(3000);
    console.log("Listening ...");
  } catch (e) {
    console.log(e.message);
  }
}

main();
