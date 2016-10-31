var log4js = require("log4js");

log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            type: 'dateFile',
            filename: 'logs/logInfo',
            pattern: "-yyyy-MM-dd.log",
            maxLogSize: 104800,
            alwaysIncludePattern: true,
            backups: 15
        }
    ],
    replaceConsole: false
});

log4js.setGlobalLogLevel(log4js.levels.INFO);

exports.setLogLevel = function (level) {
    log4js.setGlobalLogLevel(level || log4js.levels.DEBUG);
};

exports.getLogger = function (file) {
    return log4js.getLogger(file || "dateFileLog");
};
