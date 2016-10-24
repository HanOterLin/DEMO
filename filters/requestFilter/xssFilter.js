var xssFilters = require('xss-filters');
module.exports = function (op, req, res) {
    var o = op || {};
    if (req.body != undefined && req.body != null) {
        var body = req.body;
        req.body = JSON.parse(xssFilters.inHTMLData(JSON.stringify(body)));
    }
    if (req.params != undefined && req.params != null) {
        var params = req.params;
        req.params = JSON.parse(xssFilters.inHTMLData(JSON.stringify(params)));
    }
    if (req.query != undefined && req.query != undefined) {
        var query = req.query;
        req.query = JSON.parse(xssFilters.inHTMLData(JSON.stringify(query)));
    }
}
