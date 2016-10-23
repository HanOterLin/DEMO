var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/upload', {title: 'Upload'});
});

module.exports = router;
