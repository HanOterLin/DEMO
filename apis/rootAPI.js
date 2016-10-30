var express = require('express');
var router = express.Router();

//definition
var uploadAPI = require(__app.__apis.upload);
var emailAPI = require(__app.__apis.email);
var userAPI = require(__app.__apis.user);
// var dashboardAPI = require(__app.__apis.dashboard);
// var surveyAPI = require(__app.__apis.survey);
// var workflowAPI = require(__app.__apis.workflow);
// var roleAPI = require(__app.__apis.role);
// var assignmentAPI = require(__app.__apis.assignment);
// var alertAPI = require(__app.__apis.alert);
// var userAPI = require(__app.__apis.user);
// var searchAPI = require(__app.__apis.search);
// var notesAPI = require(__app.__apis.notes);
// var taskAPI = require(__app.__apis.task);

//including
router.use('/upload', uploadAPI);
router.use('/email', emailAPI);
router.use('/user', userAPI);
// router.use('/dashboard', dashboardAPI);
// router.use('/survey', surveyAPI);
// router.use('/workflow', workflowAPI);
// router.use('/role',roleAPI);
// router.use('/assignment', assignmentAPI)
// router.use('/alert', alertAPI);
// router.use('/user', userAPI);
// router.use('/search', searchAPI);
// router.use('/notes', notesAPI);
//
// router.use('/task', taskAPI);

module.exports = router;
