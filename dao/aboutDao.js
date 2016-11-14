var pgp = require("pg-promise")(/*options*/);
var db = pgp(POSTGRE_CONNECTION);
var uuid = require('uuid');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/OTER');

var User = sequelize.define('demo', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

module.exports.getAllUsers = function (params, callback) {
    User.findAll().then(function(users) {
        var data = new Array();
        users.forEach(function(element) {
            data.push(element.dataValues);
        });
        callback(null, data);
    }).catch(function (error) {
        callback(error, null);
    });
}

module.exports.addUser = function (params, callback) {
    User.sync({force: false}).then(function () {
        // Table created
        return User.create({
            firstName: params.firstName,
            lastName: params.lastName
        }).catch(function (error) {
            callback(error, null);
        });
        callback(null, null);
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