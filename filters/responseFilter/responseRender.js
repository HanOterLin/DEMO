/***
 * extend res.render for filtering
 * @param view
 * @param options
 * @param callback
 */
//var jwtVerify = require(cerberus.jwtUtil);

module.exports = function (res, view, options, callback) {

    var hasErr = false;
    for (var key in res.err) {
        hasErr = true;
    }

    if (hasErr) {
        res.redirect(login_page_url);
    } else {
        options = options ? options : {};

        options.app_name = app_name;
        options.faast_url = faast_url;

        res.render(view, options, callback);
    }

}
