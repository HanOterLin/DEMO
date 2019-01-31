var express = require('express');
var router = express.Router();
var responseRender = require(__app.__filters.responseRender);
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  responseRender(res, 'pages/index');
});

router.get('/3d-gallery-room', function(req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);
  responseRender(res, 'pages/3d-gallery-room', {images: files});


});

module.exports = router;
