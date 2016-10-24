var pgp = require("pg-promise")(/*options*/);
var db = pgp(postgre_connection);

module.exports.getUsers = function (callback) {
    db.any("select * from sp_get_user_list() order by last_name, first_name  ASC", [])
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (error) {
            logger.error(error);
            callback(error, null);
        });
}