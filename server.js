var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var PUPILS_COLLECTION = 'pupils';

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        db = client.db();
        console.log('Database connection ready');

        // Initialize the app.
        var server = app.listen(process.env.PORT || 8080, function() {
            var port = server.address().port;
            console.log('App now running on port', port);
        });
    }
);

app.get('/api/pupils', function(req, res) {
    db.collection(PUPILS_COLLECTION)
        .find({})
        .toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, 'Failed to get pupils.');
            } else {
                res.status(200).json(docs);
            }
        });
});

app.post('/api/pupils', function(req, res) {
    var newPupil = req.body;
    newPupil.createDate = new Date();

    if (!req.body.name) {
        handleError(res, 'Invalid user input', 'Must provide a name.', 400);
    } else {
        db.collection(PUPILS_COLLECTION).insertOne(newPupil, function(err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to create new pupil.');
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/pupils/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get('/api/pupils/:id', function(req, res) {
    db.collection(PUPILS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to get pupil');
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put('/api/pupils/:id', function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(PUPILS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, 'Failed to update pupil');
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete('/api/pupils/:id', function(req, res) {
    db.collection(PUPILS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
        if (err) {
            handleError(res, err.message, 'Failed to delete pupil');
        } else {
            res.status(200).json(req.params.id);
        }
    });
});
