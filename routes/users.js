var express = require('express');
var router = express.Router();

var pgp = require("pg-promise")( /*options*/ );
var db = pgp('postgres://postgres:admin@localhost:5432/OTER');

router.get('/', function (req, res) {
  res.render('pages/users', {title: 'users encryption'});
});

router.get('/getAllUsers', function (req, res) {
  db.func("oter.get_all_users")
      .then(function (data) {
        res.end(JSON.stringify(data));
      }).catch(function (error) {
    res.end(error);
  })
});

router.get('/updateUser', function (req, res) {
  var data = req.query;
  db.func("oter.update_user", [data.id, data.name, data.email, data.pwd])
      .then(function (data) {
        res.end(JSON.stringify(data));
      }).catch(function (error) {
    res.end(error);
  })
});

router.get('/addUser', function (req, res) {
  var data = req.query;
  db.func("oter.add_user", [data.name, data.email, data.pwd])
      .then(function (data) {
        res.end(JSON.stringify(data));
      }).catch(function (error) {
    res.end(error);
  })
});

router.get('/removeUserById', function (req, res) {
  var data = req.query;
  db.func("oter.remove_user", [data.id])
      .then(function (data) {
        res.end(JSON.stringify(data));
      }).catch(function (error) {
    res.end(error);
  })
});

module.exports = router;

