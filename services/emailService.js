var jwtUtil = require(__app.__utils.jwt);
var config = require('config');
var uuid = require('uuid');
var nodemailer = require('nodemailer');
var logger = require(__app.__utils.log).logger();

module.exports.sendEmail = function (params, callback) {
    try {
        var email = config.get('Email.email_example');
        email.mailOptions.to = params.regEmail;
        var contentHTML = '<h1>Verification:</h1><a href="#' + uuid.v1() + '">点击验证</a>';
        email.mailOptions.html = contentHTML;
        var transporter = nodemailer.createTransport(email.config);
        transporter.sendMail(email.mailOptions, function (error, info) {
            if (error) {
                logger.error(error);
                callback(error, null);
            } else {
                callback(null, info.response);
            }
        });
    } catch (e) {
        console.error(e);
    }
}