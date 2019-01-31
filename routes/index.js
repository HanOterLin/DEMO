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

  let num = Math.floor(files.length / 4);
  let more = files.length % 4;

  responseRender(res, 'pages/3d-gallery-room', {images: files, num, more});


});

router.get('/multi-layout-slideshow', function(req, res, next) {
  responseRender(res, 'pages/multi-layout-slideshow');
});



module.exports = router;
