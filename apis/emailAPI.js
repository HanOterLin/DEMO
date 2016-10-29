var responseHandler = require(__app.__filters.responseHandler);
var express = require('express');
var router = express.Router();
var emailService = require(__app.__services.email);

router.post('/sendEmail', function (req, res) {
    emailService.sendEmail(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

module.exports = router;
