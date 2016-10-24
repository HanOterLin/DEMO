var crypto = require('crypto');
// var request = require('request-json');
var JWT_SECRET = process.env.JWT_SECRET;
var algorithm = process.env.CRYPTO_ALGORITHM;
var secret = process.env.CRYPTO_SECRET;
var utf8 = "utf8";
var hex = "hex";


/***
 * verify and return jwt obj
 * @param jwt
 * @returns {*}
 */
module.exports.jwtVerify = function(token) {
    var jwt = require('jsonwebtoken');
    try {
        var t = token.replace(/\"/g, '');
        var obj = jwt.verify(t, JWT_SECRET);
        return module.exports.decipher(obj);
    } catch (e) {
        return null
    }
}

/***
 *
 * @param jwtObj
 * @returns {*}
 */
module.exports.decipher = function(jwtObj) {
    var ctyJwt = {};
    try {
        if (jwtObj) {

            for (var key in jwtObj) {
                var text = jwtObj[key]
                if (typeof text === "string") {
                    var decipher = crypto.createDecipher(algorithm, secret);
                    text = decipher.update(text, hex, utf8);
                    text += decipher.final(utf8);
                }
                ctyJwt[key] = text;
            }
            return ctyJwt;
        }
    } catch (e) {
        console.log(e);
    }
    return null;
}
