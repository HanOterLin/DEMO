var jwtlib = require('jsonwebtoken');
var crypto = require('crypto');
var request = require('request-json');
var JWT_SECRET = process.env.JWT_SECRET;
var CRONOS_PGUID = process.env.CRONOS_PGUID;
var FAASTLoginPage = process.env.FAAST_LOGIN_PAGE;
var cronosAPIUrl = process.env.CRONOS_API_URL;
var auth = require('./loggedIn');
var client = request.createClient(process.env.REQUEST_CLIENT_URL);
var pgp = require("pg-promise")(/*options*/);
var db = pgp(process.env.POSTGRESQL_CONNECTION);
var algorithm = process.env.CRYPTO_ALGORITHM;
var secret = process.env.CRYPTO_SECRET;

module.exports.encrypt = function (text) {
    var cipher = crypto.createCipher(algorithm, secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

module.exports.decrypt = function (text) {
    var decipher = crypto.createDecipher(algorithm, secret)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports.getRoleNameByJWT = function (jwt) {
    // Parse out roleName 
    jwtlib.verify(jwt, JWT_SECRET, function (err, decoded) {
        return auth.decrypt(decoded.roleName);
    });
}

module.exports.getRoles = function (callback) {
    var primaryRole = [];
    var otherRoles = [];
    var rolesCombo = [];


    client.get(cronosAPIUrl + 'app/getCurrentRole', function (err, response, body) {


        var userData = response.body;
        var result = JSON.parse(userData);

        //logic to seperate out primary roles from others
        var count = result.length;
        for (var i = 0; i < count; i++) {
            if (result[i].primary_role == "1" || count == 1) {
                //primaryRole.push[result[i]];
                var temp = {
                    "uguid": result[i].uguid,
                    "first_name": result[i].first_name,
                    "last_name": result[i].last_name,
                    "username": result[i].username,
                    "rguid": result[i].rguid,
                    "role_name": result[i].role_name,
                    "urguid": result[i].uguid,
                    "primary_role": result[i].primary_role
                }
                primaryRole.push(temp);
                // console.log("this object " + primaryRole);
            } else {
                var temp = {
                    "uguid": result[i].uguid,
                    "first_name": result[i].first_name,
                    "last_name": result[i].last_name,
                    "username": result[i].username,
                    "rguid": result[i].rguid,
                    "role_name": result[i].role_name,
                    "urguid": result[i].uguid,
                    "primary_role": result[i].primary_role
                }
                otherRoles.push(temp);

            }
        }

        rolesCombo = [primaryRole[0], otherRoles];
        callback(rolesCombo);
    });

}

// function to check if user is logged-in in the current session
module.exports.loggedIn = function (req, res, next) {
    var jwt = req.cookies['jwt-cronos'];
    if (typeof jwt !== 'undefined' && jwt) {

        // Parse out pGuid and validate that it matches CRONOS project
        jwtlib.verify(jwt, JWT_SECRET, function (err, decoded) {
            if (auth.decrypt(decoded.pGuid) == CRONOS_PGUID) {
                // proceed
                var jwtUtil=require("./jwt");
                req.user = jwtUtil.jwtVerify(jwt);
                next();
            } else {
                console.log("LOGGEDIN: Pguid doesnt match");
                res.redirect(FAASTLoginPage); // pGuid doesn't match
            }
        });

    } else {
        // jwt-cronos cookie not present, make user login
        res.redirect(FAASTLoginPage);
    }
}

// function to check and exchange a uGuid for a urGuid
module.exports.tokenExchange = function (req, res, next) {
    var jwt = req.cookies['jwt-cronos'];
    if (typeof jwt !== 'undefined' && jwt) {
        jwtlib.verify(jwt, JWT_SECRET, function (err, decoded) {

            //checks decoded is null, if the jwt expires and err contains msg
            if (auth.decrypt(decoded.pGuid) == CRONOS_PGUID) {
                // grab pre-existing token values for the new token
                var firstName = auth.decrypt(decoded.firstName);
                var lastName = auth.decrypt(decoded.lastName);
                var email = auth.decrypt(decoded.email);
                var uGuid = auth.decrypt(decoded.uGuid);
                var pGuid = auth.decrypt(decoded.pGuid);

                // TODO: Figure out what role(s) are assigned to the user and add to navbar and jwt
                /*

                 db.any("select array_to_json(array_agg(a)) from (select * from public.sp_get_user_roles_list($1,'')) a", uGuid)
                 .then(function(data) {
                 var result = JSON.parse(JSON.stringify(data));
                 var count = result["array_to_json"].length;
                 console.log(count);
                 while (i=0, i < count, i++) {
                 if (result.array_to_json[i].primary_role == "1") {
                 urGuid = user.urGuid;
                 console.log("My UrGuid is, ", urGuid);
                 }
                 }


                 })
                 .catch(function(error) {
                 // error;
                 console.log(error);
                 });
                 */

                var roleName = "Read-Only";

                // TOTAL HACK
                if (firstName != "Read") {
                    roleName = "Normal"; // Not a real role name, but suits our purpose
                }


                var user = {
                    firstName: auth.encrypt(firstName),
                    lastName: auth.encrypt(lastName),
                    email: auth.encrypt(email),
                    uGuid: auth.encrypt(uGuid),
                    pGuid: auth.encrypt(pGuid),
                    roleName: auth.encrypt(roleName)
                };


                // create the token and set it in the cookie
                var token = jwtlib.sign(user, JWT_SECRET, {expiresIn: "14h"});
                res.cookie('jwt-cronos', token, {expire: new Date() + 50400000, httpOnly: false});
                
                var jwtUtil=require("./jwt");
                req.user = jwtUtil.decipher(user);

                // forward on
                next();
            } else {
                res.redirect(FAASTLoginPage); // force the user to login as they aren't in the right project
                console.log("TokenExchange: Pguid doesnt match");
            }
        });
    } else {
        res.redirect(FAASTLoginPage); // force the user to login as not jwt is present
    }
}
