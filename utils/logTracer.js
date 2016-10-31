var logType = process.env.LOG_TYPE;
var colors = require('colors');
var logger;
if (logType == 'FILE') {
    logger = require('tracer').dailyfile({root: 'logs/', maxLogFiles: 15, allLogsFileName: 'log'});
} else {
    logger = require('tracer').colorConsole(
        {
            format: [
                "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
                {
                    error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
                }
            ],
            dateformat: "HH:MM:ss.L",
            preprocess: function (data) {
                data.title = data.title.toUpperCase();
            }
        });
}
module.exports = logger;
