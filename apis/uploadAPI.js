var responseHandler = require(__app.__filters.responseHandler);
var uploadService = require(__app.__services.upload);
var express = require('express');
var router = express.Router();

router.post('/upload-file', function (req, res) {
    uploadService.uploadFile(req, res, function (error, data) {
        responseHandler(res, error, data);
    });
});

module.exports = router;
