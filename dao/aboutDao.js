var Sequelize = require('sequelize');

var mysqlSQL = new Sequelize('OTER', 'root', 'admin', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 2,
        min: 0,
        idle: 10000
    }
});

var postgreSQL = new Sequelize('postgres://postgres:admin@localhost:5432/OTER');

var sequelize = mysqlSQL;

var User = sequelize.define('users', {
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
        return User.create({
            firstName: params.firstName,
            lastName: params.lastName
        });
    });
    callback(null, null);
}
module.exports.removeUser = function (params, callback) {
    User.destroy({
        where: {
            id: parseInt(params.id)
        }
    });
    callback(null, params);
}

module.exports.updateUser = function (params, callback) {
    User.sync({force: false}).then(function () {
        User.update({
            firstName: params.first_name,
            lastName: params.last_name
        }, {
            where: {
                id: parseInt(params.id)
            }
        });
    });
    callback(null, params);
}