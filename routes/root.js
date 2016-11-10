var express = require('express');
var router = express.Router();

//definition
var upload = require(__app.__routes.upload);
var index = require(__app.__routes.index);
var email = require(__app.__routes.email);
var user = require(__app.__routes.user);
var sms = require(__app.__routes.sms);
var survey = require(__app.__routes.survey);

//including
router.use('/', index);
router.use('/upload', upload);
router.use('/email', email);
router.use('/user', user);
router.use('/sms', sms);
router.use('/survey', survey);


module.exports = router;
