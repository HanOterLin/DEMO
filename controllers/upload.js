var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    "destination": function (req, file, cb) {
        cb(null, './upload/')
    },
    "filename": function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

router.post('/upload', upload.array('file'), function (req, res) {
    res.status(204).end();
});


module.exports = router;