//import express
var express = require("express");
var router = express.Router();

//import user from model to insert database
var user_md = require("../models/user");
//import helper to hash password
var helper = require("../helpers/helper");

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
    //hash password
    var password = helper.hash_password(user.password);
    user = {
        email: user.email,
        password: password,
        first_name: user.first_name,
        last_name: user.last_name
    };

    var result = user_md.addUser(user);

    result.then(function(data){
        res.json({message: "Insert success"});
    }).catch(function(err){
        res.render("signup", {data: {error: "error"}});
    });

    //if(!result){
       // res.render("signup", {data: {error: "Could not insert user data to database"}});
    //}
    //else{
       // res.json({message: "Insert success"});
    //}
});

router.get("/signin", function(req, res){
    res.render("signin", {data: {}});
});

module.exports = router;