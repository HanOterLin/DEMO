var pgp = require("pg-promise")(/*options*/);
var db = pgp('postgres://postgres:admin@localhost:5432/OTER');
// var logger = require(__app.__utils.log).getLogger(__filename);

module.exports.getAllUsers = function (params, callback) {
    db.query("select u_id, encode(decrypt(u_name::bytea,${key},'aes'), 'escape') as u_name, encode(decrypt(u_email::bytea,${key},'aes'), 'escape') as u_email, u_level, encode(decrypt(u_pwd::bytea,${key},'aes'), 'escape') as u_pwd, u_uuid from oter.user", params)
        .then(function (data) {
            var fs = require('fs');

            var logger = require('tracer').console({
                "transport": function (data) {
                    console.log(data.output);
                    fs.appendFile('./file.log', data.output + '\n', function(err) {
                        if (err) throw err;
                    });
                }
            });

            logger.log('hello');
            logger.trace('hello', 'world');
            logger.debug('hello %s', 'world', 123);
            logger.info('hello %s %d', 'world', 123, {foo: 'bar'});
            logger.warn('hello %s %d %j', 'world', 123, {foo: 'bar'});
            logger.error('hello %s %d %j', 'world', 123, {foo: 'bar'}, [1, 2, 3, 4], Object);

            callback(null, data);
        }).catch(function (error) {
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