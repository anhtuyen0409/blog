//import express
var express = require("express");

var router = express.Router();

//config router cho blog
router.get("/", function(req, res){
    res.json({"message": "This is Blog Page"});
});

module.exports = router;