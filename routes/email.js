var express = require('express');
var router = express.Router();
var responseRender = require(__app.__filters.responseRender);

/* GET users listing. */
router.get('/', function(req, res, next) {
    responseRender(res, 'pages/email');
});

module.exports = router;
