//import express
var express = require("express");
var router = express.Router();

//import user and post from model to insert database
var user_md = require("../models/user");
var post_md = require("../models/post");
//import helper to hash password
var helper = require("../helpers/helper");

//config router cho admin
router.get("/", function(req, res){
    //res.json({"message": "This is Admin Page"});
    //if(req.session.user){
        // res.json({"message": "This is Admin Page"});
        var data = post_md.getAllPosts();
        //trả về data
        data.then(function(posts){
            var data = {
                posts: posts,
                error: false
            };

            res.render("admin/dashboard", {data: data});
        }).catch(function(err){
            res.render("admin/dashboard", {data: {error: "Get Post data is Error"}});
        });
    //}else{
        //res.redirect("/admin/signin");
    //}
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
        //res.json({message: "Insert success"});
        //sau khi đăng ký thành công sẽ điều hướng sang trang đăng nhập
        res.redirect("/admin/signin");
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

router.post("/signin", function(req, res){
    var params = req.body;
    if(params.email.trim().length == 0){
        res.render("signin", {data: {error: "Please enter an email"}});
    }
    else if(params.password.trim().length == 0){
        res.render("signin", {data: {error: "Please enter password"}});
    }
    else{
        //sau khi check người dùng đã nhập email và pass thì tiến hành lấy dữ liệu từ db
        var data = user_md.getUserByEmail(params.email);

        if(data){
            data.then(function(users){
                var user = users[0];

                var status = helper.compare_password(params.password, user.password);

                if(!status){
                    res.render("signin", {data: {error: "Password Wrong"}});
                }else{
                    req.session.user = user; //đẩy thông tin user vào session
                    console.log(req.session.user);
                    res.redirect("/admin/");
                }
            });
        }else{
            res.render("signin", {data: {error: "User not exists"}});
        }
    }
});

//điều hướng sang trang thêm mới bài viết
router.get("/post/new", function(req, res){
   // if(req.session.user){
        res.render("admin/post/new", {data: {error: false}});
   // }else{
     //   res.redirect("/admin/signin");
    //}

});

//chức năng thêm mới bài viết
router.post("/post/new", function(req, res){
    var params = req.body;

    if(params.title.trim().length == 0){
        var data = {
            error: "Please enter a title"
        };

        res.render("admin/post/new", {data: data});
    }else{
        //var now = new Date();
       // params.created_at = now;
       // params.updated_at = now;

        var data = post_md.addPost(params);

        data.then(function(result){
            res.redirect("/admin");
        }).catch(function(err){
            var data = {
                error: "Could not insert post"
            };

            res.render("admin/post/new", {data: data});
        });
    }
});

//điều hướng trang chỉnh sửa
router.get("/post/edit/:id", function(req, res){
    //if(req.session.user){
        var params = req.params;
        var id = params.id;

        var data = post_md.getPostByID(id);

        if(data){
            data.then(function(posts){
                var post = posts[0];
                var data = {
                    post: post,
                    error: false
                };

                res.render("admin/post/edit", {data: data});
            }).catch(function(err){
                var data = {
                    error: "Could not get Post by ID"
                };

                res.render("admin/post/edit", {data: data});
            });
        }else{
            var data = {
                error: "Could not get Post by ID"
            };

            res.render("admin/post/edit", {data: data});
        }
   // }else{
       // res.redirect("/admin/signin");
    //}

});

module.exports = router;