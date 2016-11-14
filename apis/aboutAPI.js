var responseHandler = require(__app.__filters.responseHandler);
var aboutService = require(__app.__services.about);
var express = require('express');
var router = express.Router();

router.get('/init', function (req, res) {

    var Sequelize = require('sequelize');


    // var sequelize = new Sequelize('OTER', 'admin', 'admin', {
    //     host: 'localhost',
    //     // dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
    //     dialect: 'postgres',
    //
    //     pool: {
    //         max: 1,
    //         min: 0,
    //         idle: 10000
    //     },

        // SQLite only
        // storage: 'path/to/database.sqlite'
    // });

// Or you can simply use a connection uri
    var sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/OTER');

    var User = sequelize.define('oter.demo', {
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

    User.sync({force: true}).then(function () {
        // Table created
        return User.create({
            firstName: 'John',
            lastName: 'Hancock'
        });
    });

    // var Employee = sequelize.define('employee', {
    //     name:  {
    //         type     : Sequelize.STRING,
    //         allowNull: false,
    //         get      : function()  {
    //             var title = this.getDataValue('title');
    //             // 'this' allows you to access attributes of the instance
    //             return this.getDataValue('name') + ' (' + title + ')';
    //         },
    //     },
    //     title: {
    //         type     : Sequelize.STRING,
    //         allowNull: false,
    //         set      : function(val) {
    //             this.setDataValue('title', val.toUpperCase());
    //         }
    //     }
    // });
    //
    // Employee.sync({force: true}).then(function () {
    // return Employee
    //     .create({ name: 'John Doe', title: 'senior engineer' })
    //     .then(function(employee) {
    //         console.log(employee.get('name')); // John Doe (SENIOR ENGINEER)
    //         console.log(employee.get('title')); // SENIOR ENGINEER
    //     });
    // });

});

router.get('/all-user', function (req, res) {
    aboutService.getAllUsers(function (error, data) {
        responseHandler(res, error, data);
    });
});

router.post('/add-user', function (req, res) {
    aboutService.addUser(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

router.post('/remove-user', function (req, res) {
    aboutService.removeUser(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

router.post('/update-user', function (req, res) {
    aboutService.updateUser(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

module.exports = router;
