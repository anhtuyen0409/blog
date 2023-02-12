//import express
var express = require("express");

var app = express();

//import controller
var controllers = require(__dirname = "./apps/controllers");

//use controller
app.use(controllers);

app.listen(3000, function(){
    console.log("Server is running on port ",3000);
});