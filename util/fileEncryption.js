var encryptor = require('file-encryptor');

var key = '$e(ret!';


/**
 *
 * @param inputPath
 * @param encryptedPath
 * @param callback
 */
module.exports.encryptFile=function(inputPath,encryptedPath,callback){
  // Encrypt file.
  encryptor.encryptFile(inputPath, encryptedPath, key, function(err) {
    callback(err);
  });
}

/***
 *
 * @param encryptedPath
 * @param outPath
 * @param callback
 */
module.exports.decryptFile=function(encryptedPath,outPath,callback){
  // Decrypt file.
  encryptor.decryptFile(encryptedPath, outPath, key, function(err) {
    callback(err);
  });

}


