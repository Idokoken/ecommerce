const express = require("express");
const chalk = require("chalk");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const expresslayout = require("express-ejs-layouts");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const productsRouter = require("./routes/productsRouter");

require("dotenv").config();

const app = express();

//views setup
app.set("view engine", "ejs");
app.set("views", "views");
app.use(expresslayout);
app.set("layout", "layouts/layout");

//middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "user secret",
    saveUninitialized: true,
    resave: true,
    // cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

//database setup
// process.env.MONGO_URI
// mongodb://localhost/ecommerce
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => console.log("error connecting to database"));
db.once("open", () => console.log(`connected to ${chalk.magenta("database")}`));

//route setup
app.get("/", (req, res) => {
  let cookieValue = req.cookies;
  console.log(cookieValue.cart);
  console.log(cookieValue)
  res.clearCookie("cart");
  res.send("you are on the homepage");
});
app.use("/", productsRouter);

const port = process.env.PORT;

app.listen(port, () => console.log("listening on port " + chalk.magenta(8080)));