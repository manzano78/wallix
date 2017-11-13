require('./server/logger');
const express = require('express');
const database = require('./server/database');
const routes = require('./server/routes');

const port = 3000;
const server = express();

database.mountSchemaAndData();

routes.initializeRoutes(server);

server.listen(port);

console.log(`Server running on port ${port}!`);