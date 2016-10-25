/***
 *
 * the overall function for handle response
 */


var beforeSend = require('./beforeSend');
var afterSend = require('./afterSend');

var error = {
    "msg": "error",
    "code": -1,
}

var success = {
    "msg": "ok",
    "code": 0,
}

var codeMapping = require(__app.__filters.codeMapping);

/***
 * handler all the response API
 * @param res
 * @param err
 * @param result
 */
module.exports = function(res, err, result) {
    try {
        if (err) {
            if (err.code) {
                if (err.code === 999) {
                    error.code = err.code;
                    error["msg"] = err.err;
                } else {
                    error.code = err.code;
                    error["msg"] = codeMapping[err.code] ? codeMapping[err.code] : "error";
                }
            }
            console.log(JSON.stringify(error));
            beforeSend(res, err, error);
            res.json(error);
            afterSend(res, err, error);
        } else {
            success["data"] = result;
            beforeSend(res, err, success);
            res.json(success);
            afterSend(res, err, success);
        }
    } catch (e) {
        console.log(e);
    }
}
