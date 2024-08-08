const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const expressSession = require("express-session");
const cookieParser = require('cookie-parser');
// const flash = require("connect-flash");

require("dotenv").config();

const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/indexRouter");
app.use(cookieParser());


// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON bodiesh
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   expressSession({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.EXPRESS_SESSION_SECRET,
//   })
// )
// app.use(flash());

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port 3000`);
});