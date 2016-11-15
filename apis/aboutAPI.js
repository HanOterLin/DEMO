var responseHandler = require(__app.__filters.responseHandler);
var aboutService = require(__app.__services.about);
var express = require('express');
var router = express.Router();

router.get('/all-users', function (req, res) {
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
