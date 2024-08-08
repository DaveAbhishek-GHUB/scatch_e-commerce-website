const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const alert = require("alert-node");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel.findOne({ email: decoded.email }).select("-password");

    req.user = user;
    next();
  } catch (err) {
    alert("you need to login first");
    res.redirect("/");
  }
};
