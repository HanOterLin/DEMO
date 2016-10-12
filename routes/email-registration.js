var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('pages/email-registration', { title: 'Email Registration' });
});

module.exports = router;
