var jwtUtil = require(__app.__utils.jwt);
var logger = require(__app.__utils.log).logger();
var alidayu = require('alidayu-node');

module.exports.sendMessage = function (params, callback) {
    var app = new alidayu('23472711', '33e582a3fb02501c8e09751c3731ff98');

    app.smsSend({
            sms_free_sign_name: 'OTER网站',
            sms_param: "{name:'TONY',code:" + params.msg + "}",
            rec_num: params.num,
            sms_template_code: 'SMS_18380331'
        },
        function (result) {
            var sms_response = result.alibaba_aliqin_fc_sms_num_send_response.result;
            if (sms_response.success) {
                callback(null, sms_response);
            } else {
                logger.error(error);
                callback(error, null);
            }
        }
    );
}