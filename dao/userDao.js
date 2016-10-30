var pgp = require("pg-promise")(/*options*/);
var db = pgp('postgres://postgres:admin@localhost:5432/OTER');
// var logger = require(__app.__utils.log).getLogger(__filename);

module.exports.getAllUsers = function (params, callback) {
    db.query("select u_id, encode(decrypt(u_name::bytea,${key},'aes'), 'escape') as u_name, encode(decrypt(u_email::bytea,${key},'aes'), 'escape') as u_email, u_level, encode(decrypt(u_pwd::bytea,${key},'aes'), 'escape') as u_pwd, u_uuid from oter.user", 9)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        var logger = require('tracer').console({level:'warn'});
        logger.warn(error);
        callback(error, null);
    });
}

module.exports.addUser = function (params, callback) {
    db.query("insert into oter.user(u_name, u_email, u_pwd) values (encrypt(${name},${key},'aes'),encrypt(${email},${key},'aes') ,encrypt(${pwd},${key},'aes'))", params)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        callback(error, null);
    });
}
module.exports.removeUser = function (params, callback) {
    db.query("DELETE FROM oter.user where u_id = ${id}", params)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        callback(error, null);
    });
}

module.exports.updateUser = function (params, callback) {
    db.query("UPDATE oter.user SET u_name = encrypt(${name},${key},'aes'), u_email = encrypt(${email},${key},'aes'), u_pwd = encrypt(${pwd},${key},'aes') where u_id = ${id}", params)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        callback(error, null);
    })
}