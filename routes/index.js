var express = require('express');
var router = express.Router();
var responseRender = require(__app.__filters.responseRender);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('pages/index', { title: 'Home' });
  responseRender(res, 'pages/index');
});

module.exports = router;
