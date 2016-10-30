// var jwtUtil = require(__app.__utils.jwt);
var config = require('config');
var key = '$e(ret!';
var uuid = require('uuid');
var userDao = require(__app.__dao.user);

module.exports.getAllUsers = function (callback) {
    var params = {key: key};
    userDao.getAllUsers(params, function (error, data) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports.addUser = function (params, callback) {
    params.key = key;
    userDao.addUser(params, function (error, data) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports.removeUser = function (params, callback) {
    params.key = key;
    userDao.removeUser(params, function (error, data) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports.updateUser = function (params, callback) {
    params.key = key;
    userDao.updateUser(params, function (error, data) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}


//
// router.post('/updateUser', function (req, res) {
//     var data = req.body;
//     data.key = key;
//     db.query("UPDATE oter.user SET u_name = encrypt(${name},${key},'aes'), u_email = encrypt(${email},${key},'aes'), u_pwd = encrypt(${pwd},${key},'aes') where u_id = ${id}", data)
//         .then(function (data) {
//             res.end(JSON.stringify(data));
//         }).catch(function (error) {
//         res.end(error);
//     })
// });
//
// router.get('/addUser', function (req, res) {
//     var data = req.query;
//     data.key = key;
//
//     db.query("insert into oter.user(u_name, u_email, u_pwd) values (encrypt(${name},${key},'aes'),encrypt(${email},${key},'aes') ,encrypt(${pwd},${key},'aes'))", data)
//         .then(function (data) {
//             res.end(JSON.stringify(data));
//         }).catch(function (error) {
//         res.end(error);
//     })
// });
//
// router.get('/removeUserById', function (req, res) {
//     var data = req.query;
//     data.key = key;
//     db.query("DELETE FROM oter.user where u_id = ${id} ", data).then(function (data) {
//         res.end(JSON.stringify(data));
//     }).catch(function (error) {
//         res.end(error);
//     })
// });