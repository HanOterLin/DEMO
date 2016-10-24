var userDao = require(__app.__dao.user);
var jwtUtil = require(__app.__utils.jwt);

module.exports.getUsers = function (callback) {
    userDao.getUsers(function (error, data) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
};