const fs = require('fs');
const winston = require('winston');
const database = require('../database');

exports.loadSqlFilenameList = (req, res) => {

    fs.readdir('./assets/sql', (err, fileNames) => {

        const fileNamesWithoutExtension = fileNames.map(fileName => {
            const lastDotIndex = fileName.lastIndexOf('.');
            return fileName.substring(0, lastDotIndex);
        });

        res.json(fileNamesWithoutExtension);
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

            fs.readFile(filePath, 'utf-8', (err, selectStatement) => {

                database.instance.all(selectStatement, [], (err, rows) => {

                    if(err){

                        console.error(err);
                        res.status(500).send('Could not execute SQL query');

                    } else {

                        winston.info(`Executed SQL query : ${selectStatement}`);

                        res.json(rows);
                    }
                });
            });
        }
    });
};