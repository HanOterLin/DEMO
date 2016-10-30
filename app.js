var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

// var routes = require('./routes/index');
// var users = require('./routes/users');
// var verification = require('./routes/verification');
// var emailRegistration = require('./routes/email-registration');
// var emailService = require('./controllers/email');
// var about = require('./routes/about');
// var upload = require('./routes/upload');
// var uploadService = require('./controllers/upload');
// var sms = require('./routes/sms');

//set global variables
require('dotenv').config();
global.APP_NAME = process.env.APP_NAME;
global.RENDER_DATA = {APP_NAME: APP_NAME};
global.POSTGRE_CONNECTION = process.env.POSTGRESQL_CONNECTION + APP_NAME;


require('./global');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var filter = require(__app.__filters.filters);

app.use(filter());
app.use('/' + APP_NAME, require(__app.__routes.root));
app.use('/' + APP_NAME, require(__app.__apis.root));

// Registration Pages
// app.use('/email', emailRegistration);
// app.use('/email', emailService);
//
//
// app.use('/', routes);
// app.use('/users', users);
// app.use('/sms', sms);
// app.use('/upload', upload);
// app.use('/upload', uploadService);
// app.use('/code-verification', verification);
// app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: {}
  });
});

// fs.readdirSync('./controllers').forEach(function(file) {
//   if (file.substr(-3) == '.js') {
//     var route = require('./controllers/' + file);
//     route.controller(app, currentUser);
//   }
// });


app.set('port', 8888);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('http://localhost:' + app.get('port') + '/' + APP_NAME);
});

module.exports = app;
