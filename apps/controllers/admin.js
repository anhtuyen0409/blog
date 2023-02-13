//import express
var express = require("express");
var router = express.Router();

//import user from model to insert database
//var user_md = require("../models/user");

//config router cho admin
router.get("/", function(req, res){
    res.json({"message": "This is Admin Page"});
});

router.get("/signup", function(req, res){
    res.render("signup", {data: {}});
});

//chức năng đăng ký
router.post("/signup", function(req, res){
    var user = req.body;
    //kiểm tra 
    if(user.email.trim().length == 0){
        res.render("signup", {data: {error: "Email is required"}});
    }
    if(user.password != user.repassword && user.password.trim().length != 0){
        res.render("signup", {data: {error: "Password is not match"}});
    }

    //insert to database
    
});

module.exports = router;