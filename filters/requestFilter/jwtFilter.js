var jwtUtil = require(__app.__utils.jwt);

//var codeMapping = require(__app.__filters.codeMapping);
/***
 * jwt filter for handle login
 * @param op
 * @param req
 * @param res
 */
module.exports = function(op, req, res) {
    var o = op || {};

    var jwt = req.cookies[jwt_name];

    var jwtObj = jwtUtil.jwtVerify(jwt);

    //success
    if (jwtObj) {
        req.jwt = jwtObj;
        res.jwt = jwtObj;
    } else {

       // res.err[301] = codeMapping[301];

    }

}
