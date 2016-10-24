var rp = require('request-promise');
var logger = require(__app.__utils.log).getLogger(__filename);

module.exports.doRequest = function (params, callback) {
    var data = {};
    data.method = params.method;
    data.url = params.uri;
    if (data.method.toLowerCase() == 'post') {
        data.params = params.body;
    }
    data.orgin = app_url;
    data.jwtName = jwt_name;

    var options = {
        uri: faast_url + 'APILog',
        method: 'post',
        headers: params.headers,
        body: data,
        json: true
    };
    rp(options).then(function (res) {
        if(options.body.url.indexOf('/workEngine/') >= 0) {
            callback(res);
        } else {
            if (res.code == 0) {
                callback(null, res.data);
            } else {
                logger.warn(res);
                callback(res, null);
            }
        }

    }).catch(function (err) {
        logger.error(err);
        callback(err, null);
    });
}


