exports.logger = function () {
    var fs = require('fs');
    var date = new Date();
    var time_string = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return require('tracer').console({
        "transport": function (data) {
            console.log(data.output);
            fs.appendFile('./log/'+ time_string + '.log', data.output + '\n', function (err) {
                if (err) throw err;
            });
        }
    });
};
