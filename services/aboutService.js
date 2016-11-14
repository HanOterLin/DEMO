// var jwtUtil = require(__app.__utils.jwt);
var config = require('config');
var key = '$e(ret!';
var uuid = require('uuid');
var aboutDao = require(__app.__dao.about);
var logger = require(__app.__utils.log);

module.exports.getAllUsers = function (callback) {
    var params = {key: key};
    aboutDao.getAllUsers(params, function (error, data) {
        if (error) {
            logger.error(error);
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports.addUser = function (params, callback) {
    params.key = key;
    aboutDao.addUser(params, function (error, data) {
        if (error) {
            logger.error(error);
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports.removeUser = function (params, callback) {
    params.key = key;
    aboutDao.removeUser(params, function (error, data) {
        if (error) {
            logger.error(error);
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports.updateUser = function (params, callback) {
    params.key = key;
    aboutDao.updateUser(params, function (error, data) {
        if (error) {
            logger.error(error);
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
}