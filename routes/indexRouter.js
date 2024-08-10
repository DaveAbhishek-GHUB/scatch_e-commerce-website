const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggenIn");
const productModel = require("../models/product-model");    
const userModel = require("../models/user-model");
const alert = require("alert-node");

router.get("/", function(req, res){
    // res.send("hey,its working...");
    res.render("index", { error: '', Loggedin: false});
});

router.get("/shop", isLoggedin, async function(req, res){
    let products = await productModel.find();
    res.render("shop", {products});
});

router.get("/cart", isLoggedin, async function(req, res){
    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    res.render("cart", {user});
    // console.log(user.cart);
});

router.get("/addtocart/:productid", isLoggedin, async function(req, res){
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    alert("product added to cart");
    res.redirect("/shop");
});

router.get("/account", isLoggedin, function(req, res){
    res.send("Account here");
})

module.exports = router;