const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });

    if (user) {
      return res.status(401).send("yout already have account please login");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.send(err.message);
        } else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          let token = generateToken(user);
          // let token = jwt.sign({email, id: user._id}, "secret");
          res.cookie("token", token);
          res.send("user created successfully");
          // res.send(token);
          // res.send(user);
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.send("Email and password incorrect");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    // res.send(result);
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      return res.send("Email and password incorrect");
    }
  });
};

module.exports.logout =  function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
