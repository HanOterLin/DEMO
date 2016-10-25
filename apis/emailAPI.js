var responseHandler = require(__app.__filters.responseHandler);
var express = require('express');
var router = express.Router();

router.get('/getUsers', function (req, res) {
    // userService.getUsers(function (error, data) {
    //     responseHandler(res, error, data);
    // });
});

module.exports = router;
