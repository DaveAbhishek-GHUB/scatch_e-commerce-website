const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggenIn");

router.get("/", function(req, res){
    // res.send("hey,its working...");
    // let error = flash("error");
    res.render("index", { error: ''});
})

router.get("/shop", isLoggedin, function(req, res){
    res.render("shop");
})

module.exports = router;