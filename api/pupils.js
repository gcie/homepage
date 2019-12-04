var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();
var ObjectID = mongodb.ObjectID;
var PUPILS_COLLECTION = 'pupils';

function handleError(res, err, msg, status) {
    if (status === null) status = 500;
    res.status(status).json({ error: msg, raw: err });
}

module.exports = function(db) {
    router.get('', function(req, res) {
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

    router.post('', function(req, res) {
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

    /*  "/:id"
     *    GET: find contact by id
     *    PUT: update contact by id
     *    DELETE: deletes contact by id
     */

    router.get('/:id', function(req, res) {
        db.collection(PUPILS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to get pupil');
            } else {
                res.status(200).json(doc);
            }
        });
    });

    router.put('/:id', function(req, res) {
        var updateDoc = req.body;
        delete updateDoc._id;

        db.collection(PUPILS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, { $set: updateDoc }, function(err, doc) {
            if (err) {
                handleError(res, err.message, 'Failed to update pupil');
            } else {
                updateDoc._id = req.params.id;
                res.status(200).json(updateDoc);
            }
        });
    });

    router.delete('/:id', function(req, res) {
        db.collection(PUPILS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
            if (err) {
                handleError(res, err.message, 'Failed to delete pupil');
            } else {
                res.status(200).json(req.params.id);
            }
        });
    });

    return router;
};
