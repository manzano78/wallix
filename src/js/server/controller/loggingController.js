const fs = require('fs');
const winston = require('winston');

const logsDirectory = './assets/logs';

exports.loadLogsList = (req, res) => {

    fs.readdir(logsDirectory, (err, fileNames) => {

        const logFileNames = fileNames.filter(fileName => fileName !== '.gitignore');

        if(logFileNames.length){

            const logger = new (winston.Logger)({
                transports: logFileNames.map(fileName => new (winston.transports.File)({
                    filename: `${logsDirectory}/${fileName}`,
                    name: fileName
                }))
            });

            logger.query({}, (err, logsPerFileName) => {

                const logs = mergeLogs(logsPerFileName, logFileNames);

                orderLogsByDateDesc(logs);

                res.json(logs);
            });
        } else {

            res.json([]);
        }
    });
};

const mergeLogs = (logsPerFileName, fileNames) => {

    let logs = [];

    fileNames.forEach(filename => {
        const fileNameLogs = logsPerFileName[filename];
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