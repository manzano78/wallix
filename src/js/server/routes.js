const express = require('express');
const path = require('path');
const sqlQueryController = require('./controller/sqlQueryController');
const loggingController = require('./controller/loggingController');

const publicPath = path.join(__dirname, '/../../../public');

exports.initializeRoutes = (server) => {
    server.use('/public', express.static(publicPath));
    server.get('/api/sql/list', sqlQueryController.loadSqlFilenameList);
    server.get('/api/sql/query/:fileName', sqlQueryController.getSqlQueryResults);
    server.get('/api/logs/list', loggingController.loadLogsList);
    server.get('*', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));
};