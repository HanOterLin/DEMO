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
            var logger = require('tracer').console({level:'warn'});
            logger.warn(error);
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