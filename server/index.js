const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');

const app = express();

app.use(express.static('public'));

const DB_URL = 'mongodb://localhost:27017/todos';

MongoClient.connect(DB_URL, function(err, db) {
    console.log('Connecting to db');
    assert.equal(null, err);
    console.log("Connected correctly to server");

    app.listen(3000, () => {
        console.log('Listening on 3000');
    });

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/items', (req, res) => {
        db.collection('items').find().toArray((err, results) => {
            if (!err)
                err = null;
            const result = {
                error: err,
                data: results
            };
            res.jsonp(result);
        });
    });
});
