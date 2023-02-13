//import modules/libralies
var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");

var app = express();
//sử dụng body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //nhận file signup.ejs

//setup view
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

//static folder
app.use("/static", express.static(__dirname + "/public"));

//import controller
var controllers = require(__dirname + "/apps/controllers");

//use controller
app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port, host, function(){
    console.log("Server is running on port ",port);
});