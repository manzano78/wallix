const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = exports.instance = new sqlite3.Database('./database.db');

exports.mountSchemaAndData = () => {

    const datasetScript = fs.readFileSync('./dataset.sql', 'utf-8');
    const datasetStatements = datasetScript.split(/\s*;\s*/g);

    db.serialize(() => datasetStatements.forEach(statement => statement && db.run(statement)));
};