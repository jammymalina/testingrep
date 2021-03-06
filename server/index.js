const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const DB_URL = 'mongodb://localhost:27017/todos';

MongoClient.connect(DB_URL, (err, db) => {
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
            if (!err) {
                err = null;
            }
            const result = {
                error: err,
                data: results
            };
            res.jsonp(result);
        });
    });

    app.get('/items/:id', (req, res) => {
        db.collection('items').findOne({ id: req.params.id }, (err, item) => {
            if (!err) {
                err = null;
            }
            const result = {
                error: err,
                data: item
            };
            res.jsonp(result);
        });
    });

    app.post('/add', (req, res) => {
        const item = null || (req.body && req.body.item);
        console.log('Item addition incoming:', item);
        if (item) {
            db.collection('items').insertOne(item, (err, result) => {
                if (err) {
                    console.error(err);
                    res.jsonp({
                        error: err,
                        data: null
                    });
                } else {
                    console.log('Item added as', result);
                    const data = Object.assign({}, item, { _id: result._id });
                    res.jsonp({
                        error: null,
                        data
                    });
                }
            });
        } else {
            res.jsonp({
                error: 'No item specified in post data',
                data: null
            });
        }
    });

    app.post('/update', (req, res) => {
        const item = null || (req.body && req.body.item);
        console.log('Item update incoming:', item);
        if (item) {
            db.collection('items').findAndModify(
                { id: item.id },   // query
                [],                // sort
                { $set: item },    // replacement
                { new: true },     // options - return udated item
                (err, result) => {
                    if (err) {
                        console.error(err);
                        res.jsonp({
                            error: err,
                            data: null
                        });
                    } else {
                        console.log('Item update: ', result);
                        res.jsonp({
                            error: null,
                            data: result.value
                        });
                    }
                }
            );
        } else {
            res.jsonp({
                error: 'No item specified in post data',
                data: null
            });
        }
    });

    app.post('/setcompleted/:id=:completed', (req, res) => {
        const id = req.params.id;
        const completed = req.params.completed === 'true';
        db.collection('items').findAndModify(
            { id },            // query
            [],                // sort
            { $set: {
                completed      // replacement
            }},
            { new: true },     // options - return udated item
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.jsonp({
                        error: err,
                        data: null
                    });
                } else {
                    console.log('Item update: ', result);
                    res.jsonp({
                        error: null,
                        data: result.value
                    });
                }
            }
        );
    });

    app.post('/delete', (req, res) => {
        let items = [] && req.body && req.body.items;
        db.collection('items').remove({'id': {'$in': items}}, (err, result) => {
            if (!err) {
                res.sendStatus(200);
            } else {
                console.error(err);
                res.sendStatus(400);
            }
        });
    });
});
