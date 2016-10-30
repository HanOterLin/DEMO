var express = require('express');
var router = express.Router();
var responseRender = require(__app.__filters.responseRender);
// var pgp = require("pg-promise")(/*options*/);
// var db = pgp('postgres://postgres:admin@localhost:5432/OTER');
// var key = '$e(ret!';

router.get('/', function (req, res) {
    responseRender(res, 'pages/user');
});

// router.get('/getAllUsers', function (req, res) {
//     var data = {key: key};
//     db.query("select u_id, encode(decrypt(u_name::bytea,${key},'aes'), 'escape') as u_name, encode(decrypt(u_email::bytea,${key},'aes'), 'escape') as u_email, u_level, encode(decrypt(u_pwd::bytea,${key},'aes'), 'escape') as u_pwd, u_uuid from oter.user", data)
//         .then(function (data) {
//             res.end(JSON.stringify(data));
//         }).catch(function (error) {
//         res.end(error);
//     })
// });
//
// router.post('/updateUser', function (req, res) {
//     var data = req.body;
//     data.key = key;
//     db.query("UPDATE oter.user SET u_name = encrypt(${name},${key},'aes'), u_email = encrypt(${email},${key},'aes'), u_pwd = encrypt(${pwd},${key},'aes') where u_id = ${id}", data)
//         .then(function (data) {
//             res.end(JSON.stringify(data));
//         }).catch(function (error) {
//         res.end(error);
//     })
// });
//
// router.get('/addUser', function (req, res) {
//     var data = req.query;
//     data.key = key;
//
//     db.query("insert into oter.user(u_name, u_email, u_pwd) values (encrypt(${name},${key},'aes'),encrypt(${email},${key},'aes') ,encrypt(${pwd},${key},'aes'))", data)
//         .then(function (data) {
//             res.end(JSON.stringify(data));
//         }).catch(function (error) {
//         res.end(error);
//     })
// });
//
// router.get('/removeUserById', function (req, res) {
//     var data = req.query;
//     data.key = key;
//     db.query("DELETE FROM oter.user where u_id = ${id} ", data).then(function (data) {
//         res.end(JSON.stringify(data));
//     }).catch(function (error) {
//         res.end(error);
//     })
// });

module.exports = router;

