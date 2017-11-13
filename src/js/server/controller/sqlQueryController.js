const fs = require('fs');
const winston = require('winston');
const database = require('../database');

exports.loadSqlFilenameList = (req, res) => {

    fs.readdir('./assets/sql', (err, fileNames) => {

        const sqlFileNames = fileNames
            ? fileNames.filter(fileName => fileName.endsWith('.sql'))
            : [];

        const sqlFileNamesWithoutExtension = sqlFileNames.map(sqlFileName => {
            const lastDotIndex = sqlFileName.lastIndexOf('.');
            return sqlFileName.substring(0, lastDotIndex);
        });

        res.json(sqlFileNamesWithoutExtension);
    });
};

exports.getSqlQueryResults = (req, res) => {

    const {fileName} = req.params;
    const filePath = `./assets/sql/${fileName}.sql`;

    fs.access(filePath, fs.constants.R_OK, (err) => {

        if(err){

            winston.error(err.message);
            res.status(500).send('Could not open SQL file');

        } else {

            fs.readFile(filePath, 'utf-8', (err, sqlSelectQuery) => {

                executeSelectQueryAndReturnResults(sqlSelectQuery, res);
            });
        }
    });
};

const executeSelectQueryAndReturnResults = (sqlSelectQuery, res) => {

    database.instance.all(sqlSelectQuery, [], (err, results) => {

        if(err){

            winston.error(err.message);
            res.status(500).send('Could not execute SQL query');

        } else {

            winston.info(`Executed SQL query : ${sqlSelectQuery}`);

            res.json(results);
        }
    });
};