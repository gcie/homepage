var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();
var ObjectID = mongodb.ObjectID;
var TUTORS_COLLECTION = 'tutors';

function handleError(res, err, msg, status) {
    if (status === null) status = 500;
    res.status(status).json({ message: msg, raw: err });
}

module.exports = function(db, guards) {
    router.get('', function(req, res) {
        db.collection(TUTORS_COLLECTION)
            .find({})
            .toArray(function(err, docs) {
                if (err) {
                    handleError(res, err, 'Failed to get tutors');
                } else {
                    res.status(200).json(docs);
                }
            });
    });

    router.post('', guards.manager, function(req, res) {
        var newTutor = req.body;
        delete newTutor._id;
        newTutor.createDate = new Date();

        if (!req.body.name) {
            handleError(res, 'Invalid user input', "Pole 'imię i nazwisko' jest wymagane", 400);
        } else {
            db.collection(TUTORS_COLLECTION).insertOne(newTutor, function(err, doc) {
                if (err) {
                    handleError(res, err, 'Nie udało się zapisać nowego korepetytora');
                } else {
                    res.status(201).json(doc.ops[0]);
                }
            });
        }
    });

    router.get('/:id', function(req, res) {
        db.collection(TUTORS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
            if (err) {
                handleError(res, err, 'Nie udalo się pobrać danych wybranego korepetytora');
            } else {
                res.status(200).json(doc);
            }
        });
    });

    router.put('/:id', guards.manager, function(req, res) {
        var updateDoc = req.body;
        delete updateDoc._id;

        db.collection(TUTORS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, { $set: updateDoc }, function(err, doc) {
            if (err) {
                handleError(res, err, 'Nie udało się zaktualizować danych wybranego korepetytora');
            } else {
                updateDoc._id = req.params.id;
                res.status(200).json(updateDoc);
            }
        });
    });

    router.delete('/:id', guards.manager, function(req, res) {
        db.collection(TUTORS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
            if (err) {
                handleError(res, err, 'Nie udało się usunąć danych wybranego korepetytora');
            } else {
                res.status(200).json(req.params.id);
            }
        });
    });

    return router;
};
