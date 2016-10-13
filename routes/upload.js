var express = require('express');
var multer  = require('multer');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/upload', {title: 'Upload'});
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res) {
    // Need full filename created here
    console.log(req.file);
    res.status(204).end();
});


module.exports = router;
