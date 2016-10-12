var express = require('express');
var router = express.Router();
var config = require('config');
var uuid = require('uuid');
var nodemailer = require('nodemailer');

var pgp = require("pg-promise")( /*options*/ );
require('dotenv').config();
var db = pgp(process.env.POSTGRE_CONNECTION);


router.post('/dbtest', function (req, res) {
    db.func("oter.get_user_by_id", ['3'])
        .then(function(data) {
            res.end(JSON.stringify(data));
        }).catch(function(error) {
        res.end(error);
    })
});

router.post('/registration', function(req, res) {
    try {
        var data = req.body;

        var email = config.get('Email.regTemplate');
        email.mailOptions.to = data.regEmail;
        var contentHTML = '<h1>Verification:</h1><a href="http://localhost:8888/code-verification/'+ uuid.v1() +'">点击验证</a>';
        email.mailOptions.html = contentHTML;

        var transporter = nodemailer.createTransport(email.config);
        transporter.sendMail(email.mailOptions, function (error, info) {
            if (error) {
                res.end(error.message);
            } else {
                res.end(info.response);
            }
        });
    }catch (e){
        console.error(e);
    }
});

module.exports = router;