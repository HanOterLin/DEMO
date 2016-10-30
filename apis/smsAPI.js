var responseHandler = require(__app.__filters.responseHandler);
var smsService = require(__app.__services.sms);
var express = require('express');
var router = express.Router();

router.post('/send-msg', function (req, res) {
    smsService.sendMessage(req.body, function (error, data) {
        responseHandler(res, error, data);
    });
});

module.exports = router;
