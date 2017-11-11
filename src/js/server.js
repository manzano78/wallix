const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const server = express();

const datasetScript = fs.readFileSync('./dataset.sql', 'utf-8');
const datasetStatements = datasetScript.split(/\s*;\s*/g);

db.serialize(() => datasetStatements.forEach(statement => statement && db.run(statement)));

server.use('/public', express.static(__dirname + '/../../public'));

server.get('/api/sql/list', function (req, res) {

    fs.readdir('./assets/sql', (err, fileNames) => {

        if(err)
            throw err;

        const fileNamesWithoutExtension = fileNames.map(fileName => {
            const lastDotIndex = fileName.lastIndexOf('.');
            return fileName.substring(0, lastDotIndex);
        });

        res.json(fileNamesWithoutExtension);
    });
});

server.get('/api/sql/query/:fileName', (req, res) => {

    const {fileName} = req.params;
    const filePath = `./assets/sql/${fileName}.sql`;

    fs.access(filePath, fs.constants.R_OK, (err) => {

        if(err)
            throw err;

        fs.readFile(filePath, 'utf-8', (err, selectStatement) => {

            if(err)
                throw err;

            console.log(selectStatement)

            db.all(selectStatement, [], (err, rows) => {

                if(err)
                    throw err;

                console.log(rows);

                res.json(rows);
            });
        });
    });
});

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../public/index.html'));
});

server.listen(3000);

console.log('Server running on port 3000!');