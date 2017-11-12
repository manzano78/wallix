const winston = require('winston');

winston.remove(winston.transports.Console);

winston.add(winston.transports.File, {
    filename: 'assets/logs/log-',
    maxsize: 1024,
    maxFiles: 10000
});