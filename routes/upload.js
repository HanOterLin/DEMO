var express = require('express');
var router = express.Router();

// var fileEncryption = require ('../util/fileEncryption');

router.get('/', function (req, res) {
  res.render('index', {title: 'upload file encryption example'});
});



router.post('/upload', function (req, res, next) {
  /***
   * step: 1 upload file
   */
  var inputFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
  inputFile = req.files.file;
  inputFile.mv('upload/'+inputFile.name, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      /****
       * step: 2 encryption file
       */
      fileEncryption.encryptFile('upload/'+inputFile.name,'upload/encrypted_'+inputFile.name,function(err){
        if (err) {
          res.status(500).send(err);
        }

        /****
         * step: 3 decryption file
         */
        fileEncryption.decryptFile('upload/encrypted_'+inputFile.name,'upload/decrypted_'+inputFile.name,function(err){
          if (err) {
            res.status(500).send(err);
          }
          res.send('File uploaded!');
        })
      })
    }
  });
});

module.exports = router;
