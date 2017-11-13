const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const instance = exports.instance = new sqlite3.Database('./database.db');

exports.mountSchemaAndData = () => {

    const datasetScript = fs.readFileSync('./dataset.sql', 'utf-8');
    const datasetStatements = datasetScript.split(/\s*;\s*/g);

    instance.serialize(() => datasetStatements.forEach(statement => statement && instance.run(statement)));
};