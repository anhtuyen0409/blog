//import express
var express = require("express");

//create router
var router = express.Router();

//điều hướng trang sang admin/blog
router.use("/admin", require(__dirname = "./admin.js"));
router.use("/blog", require(__dirname = "./blog.js"));

//config router trang home
router.get("/", function(req, res){
    res.json({"message": "This is Home Page"});
});

module.exports = router;