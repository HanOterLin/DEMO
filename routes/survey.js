var express = require('express');
var router = express.Router();
var responseRender = require(__app.__filters.responseRender);

router.get('/', function (req, res, next) {
    responseRender(res, 'pages/survey');
});

module.exports = router;
