var uploadDao = require(__app.__dao.upload);
var jwtUtil = require(__app.__utils.jwt);

module.exports.uploadFile = function (req, res, callback) {
    var multer = require('multer');
    var storage = multer.diskStorage({
        "destination": function (req, file, callback) {
            callback(null, './upload/')
        },
        "filename": function (req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname)
        }
    });
    var upload = multer({storage: storage}).array('file', 10);

    upload(req, res, function (error) {
        if (error) {
            callback(error, null);
            return;
        } else {
            callback(null, null);
        }
    });
};