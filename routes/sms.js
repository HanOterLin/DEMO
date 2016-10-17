var express = require('express');
var alidayu = require('alidayu-node');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/sms', {title: 'SMS'});
});
router.get('/sendMsg', function (req, res) {

    var app = new alidayu('23472711', '33e582a3fb02501c8e09751c3731ff98');

    app.smsSend({
        sms_free_sign_name: 'OTER网站',
        sms_param: "{name:'Tony',code:'123456789'}",
        rec_num: '13162551240',
        sms_template_code: 'SMS_18380331'},
        function (error, response) {
            if (!error) console.log(response);
            else console.log(error);
        }
    );
});


module.exports = router;
