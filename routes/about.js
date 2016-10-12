var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('pages/about', { title: 'About' });
});

module.exports = router;
