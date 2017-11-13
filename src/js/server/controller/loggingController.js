const fs = require('fs');
const winston = require('winston');

const logsDirectory = './assets/logs';

exports.loadLogsList = (req, res) => {

    fs.readdir(logsDirectory, (err, fileNames) => {

        const logFileNames = fileNames
            ? fileNames.filter(fileName => fileName.startsWith('log-'))
            : [];

        if(logFileNames.length){

            queryLogs(logFileNames, (logs) => res.json(logs));

        } else {

            res.json([]);
        }
    });
};

const queryLogs = (logFileNames, callback) => {

    const logger = new (winston.Logger)({
        transports: logFileNames.map(fileName => new (winston.transports.File)({
            filename: `${logsDirectory}/${fileName}`,
            name: fileName
        }))
    });

    logger.query({}, (err, logsPerFileName) => {

        const logs = mergeLogs(logsPerFileName, logFileNames);

        orderLogsByDateDesc(logs);

        callback(logs);
    });
};

const mergeLogs = (logsPerLogFileName, logFileNames) => {

    let logs = [];

    logFileNames.forEach(filename => {
        const fileNameLogs = logsPerLogFileName[filename];
        logs = logs.concat(fileNameLogs);
    });

    return logs;
};

const orderLogsByDateDesc = (logs) => {

    logs.sort(({timestamp: timestamp1}, {timestamp: timestamp2}) => {
        const date1 = new Date(timestamp1);
        const date2 = new Date(timestamp2);
        return date2.getTime() - date1.getTime();
    });
};