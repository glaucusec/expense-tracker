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

const PORT = 3000;

const routes = require("./routes/routes");

User = require("./models/user");
Expense = require("./models/expense");
Order = require("./models/order");
ForgotPasswordRequest = require("./models/forgot-password");
filesUploaded = require("./models/filesuploaded");

const app = express();
// CORS settings
app.use(
  cors({
    origin: process.env.ORIGIN_SERVER,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
// express-session settings
const sess = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_KEY,
  cookie: { sameSite: "", secure: false },
};

if (process.env.NODE_ENV === "production") {
  sess.cookie.secure = true;
  sess.cookie.sameSite = "none";
}
app.set("trust proxy", 1);
app.use(session(sess));

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

app.use(express.urlencoded({ extended: false }));

app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use("/api/", routes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/login.html`));
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_SERVER);
    console.log("MongoDB database connection established");
    app.listen(PORT);
    console.log(`Listening on port ${PORT}...`);
  } catch (e) {
    console.log(e.message);
  }
}

main();
