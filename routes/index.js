var express = require('express');
var router = express.Router();
var responseRender = require(__app.__filters.responseRender);
const fs = require('fs');
const sizeOf = require('image-size');
const imageinfo = require('imageinfo')

/* GET home page. */
router.get('/', function (req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  const images = files.map(file => {
    const dimensions = sizeOf(photosPath + '/' + file);
    return {
      name: file,
      height: dimensions.height,
      width: dimensions.width,
    }
  });

  responseRender(res, 'pages/index', {images});
});

router.get('/3d-gallery-room', function (req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  let num = Math.floor(files.length / 4) + 1;

  responseRender(res, 'pages/3d-gallery-room', {images: files, num});


});

router.get('/record-player', function (req, res, next) {
  responseRender(res, 'pages/record-player');
});

router.get('/image-gride-effects', function (req, res, next) {

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

router.get('/photography-website-concept', async function (req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  var ExifImage = require('exif').ExifImage;

  const images = await Promise.all(files.map((file) => {
    return new Promise((resolve, reject) => {
      new ExifImage({image: __app.__root.__uploads + '/' + file}, function (error, exifData) {
        let image = {
          title: file,
        };
        if (exifData) {
          if (exifData.image) {
            image.camera = exifData.image.Model;
          }
          if (exifData.exif) {
            image.createDate = exifData.exif.CreateDate;
            image.focalLength = exifData.exif.FocalLength;
            image.aperture = exifData.exif.MaxApertureValue;
            image.exposureTime = '1/' + 1 / exifData.exif.ExposureTime;
            image.iso = exifData.exif.ISO;
          }
        }
        resolve(image);
      });
    })

  }));

  const data = [
    {
      title: '人物',
      images: images.filter((file, i) => i % 4 === 0)
    },
    {
      title: '风景',
      images: images.filter((file, i) => i % 4 === 1)
    },
    {
      title: '事件',
      images: images.filter((file, i) => i % 4 === 2)
    },
    {
      title: '特写',
      images: images.filter((file, i) => i % 4 === 3)
    }
  ];

  responseRender(res, 'pages/photography-website-concept', {data});
});

router.get('/gamma-gallery', function (req, res, next) {

  const photosPath = __app.__root.__uploads;
  const files = fs.readdirSync(photosPath);

  responseRender(res, 'pages/gamma-gallery', {images: files});
});

router.get('/rgb-tool', function (req, res, next) {
  responseRender(res, 'pages/rgb-tool');
});

router.get('/grid-layout-motion', function (req, res, next) {
  responseRender(res, 'pages/grid-layout-motion');
});


module.exports = router;
