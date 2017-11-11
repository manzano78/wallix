const express = require('express');
const path = require('path');
const fs = require('fs');

const server = express();

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

        fs.readFile(filePath, 'utf-8', (err, selectQuery) => {

            if(err)
                throw err;

            res.json([{
                nom: 'Anzano',
                prenom: 'Mikaël',
                civilite: 'Mr'
            }]);
        });
    });
});

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../public/index.html'));
});

server.listen(3000);

console.log('Server running on port 3000!');