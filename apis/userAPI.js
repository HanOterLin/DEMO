var responseHandler = require(__app.__filters.responseHandler);
var userService = require(__app.__services.user);
var express = require('express');
var router = express.Router();

router.get('/all-user', function (req, res) {
    userService.getAllUsers(function (error, data) {
        responseHandler(res, error, data);
    });
});

router.post('/add-user', function (req, res) {
    userService.addUser(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

router.post('/remove-user', function (req, res) {
    userService.removeUser(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

router.post('/update-user', function (req, res) {
    userService.updateUser(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

module.exports = router;
