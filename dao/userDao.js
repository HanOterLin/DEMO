var pgp = require("pg-promise")(/*options*/);
var db = pgp(POSTGRE_CONNECTION);
var uuid = require('uuid');

module.exports.getAllUsers = function (params, callback) {
    db.query("select u_uuid, encode(decrypt(u_name::bytea,${key},'aes'), 'escape') as u_name, encode(decrypt(u_email::bytea,${key},'aes'), 'escape') as u_email, u_level, encode(decrypt(u_pwd::bytea,${key},'aes'), 'escape') as u_pwd, u_uuid from oter.user", params)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        callback(error, null);
    });
}

module.exports.addUser = function (params, callback) {
    params.uuid = uuid.v1();
    db.query("insert into oter.user(u_name, u_email, u_pwd, u_uuid) values (encrypt(${name},${key},'aes'), encrypt(${email},${key},'aes'), encrypt(${pwd},${key},'aes'), ${uuid})", params)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        callback(error, null);
    });
}
module.exports.removeUser = function (params, callback) {
    db.query("DELETE FROM oter.user where u_uuid = ${id}", params)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        callback(error, null);
    });
}

module.exports.updateUser = function (params, callback) {
    db.query("UPDATE oter.user SET u_name = encrypt(${name},${key},'aes'), u_email = encrypt(${email},${key},'aes'), u_pwd = encrypt(${pwd},${key},'aes') where u_uuid = ${id}", params)
        .then(function (data) {
            callback(null, data);
        }).catch(function (error) {
        callback(error, null);
    })
}