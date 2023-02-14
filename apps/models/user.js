var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

//tạo các hàm
//add user
function addUser(user){
    if(user){
        var defer = q.defer();
        var query = conn.query('INSERT INTO users SET ?', user, function(err, result){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}

//lấy user theo email
function getUserByEmail(email){
    if(email){
        var defer = q.defer();

        var query = conn.query('SELECT * FROM users WHERE ?', {email: email}, function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    return false;
}

//để hàm addUser có thể sử dụng được bên ngoài ta phải exports nó
module.exports = {
    addUser: addUser,
    getUserByEmail: getUserByEmail
}