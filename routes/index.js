var express = require('express');
var router = express.Router();
var responseRender = require(__app.__filters.responseRender);
const fs = require('fs');
const sizeOf = require('image-size');

/* GET home page. */
router.get('/', function(req, res, next) {
  responseRender(res, 'pages/index');
});

router.get('/3d-gallery-room', function(req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  let num = Math.floor(files.length / 4) + 1;

  responseRender(res, 'pages/3d-gallery-room', {images: files, num});


});

router.get('/record-player', function(req, res, next) {
  responseRender(res, 'pages/record-player');
});

router.get('/image-gride-effects', function(req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  const images = files.map(file => {
    const dimensions = sizeOf(photosPath + '/' + file);
    const size = `${dimensions.width}x${dimensions.height}`;
    return {
      name: file,
      size,
    }
  });

  responseRender(res, 'pages/image-gride-effects', {images});
});

router.get('/photography-website-concept', function(req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  const data = [
    {
      title: 'topic1',
      images: files.filter((file, i) => i % 4 === 0)
    },
    {
      title: 'topic2',
      images: files.filter((file, i) => i % 4 === 1)
    },
    {
      title: 'topic3',
      images: files.filter((file, i) => i % 4 === 2)
    },
    {
      title: 'topic4',
      images: files.filter((file, i) => i % 4 === 3)
    }
  ];

  responseRender(res, 'pages/photography-website-concept', {data});
});

router.get('/gamma-gallery', function(req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  responseRender(res, 'pages/gamma-gallery', {images: files});
});

router.get('/rgb-tool', function(req, res, next) {
  responseRender(res, 'pages/rgb-tool');
});


module.exports = router;
