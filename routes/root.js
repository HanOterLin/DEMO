var express = require('express');
var router = express.Router();

//definition
var upload = require(__app.__routes.upload);
var index = require(__app.__routes.index);
// var dashboard = require(__app.__routes.dashboard);
// var survey = require(__app.__routes.survey);
// var workflow = require(__app.__routes.workflow);
// var search = require(__app.__routes.search);
// var admin = require(__app.__routes.admin);
// var entity = require(__app.__routes.entity);
// var mycronos = require(__app.__routes.mycronos);

//including
router.use('/', index);
router.use('/upload', upload);

// router.use('/dashboard', dashboard);
//
// router.use('/survey', survey);
//
// router.use('/workflow', workflow);
//
// router.use('/search', search);
//
// router.use('/admin', admin);
//
// router.use('/mycronos', mycronos);
//
// router.use('/entity', entity);

module.exports = router;
