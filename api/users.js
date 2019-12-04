var express = require('express');
const bcrypt = require('bcryptjs');
var mongodb = require('mongodb');

var router = express.Router();
var USERS_COLLECTION = 'users';
var ObjectID = mongodb.ObjectID;

module.exports = function(db) {
    router.get('', (req, res) => {
        db.collection(USERS_COLLECTION)
            .find({})
            .toArray(function(err, docs) {
                if (err) {
                    res.status(500).json({ error: 'Failed to get users', raw: err });
                } else {
                    res.status(200).json(docs);
                }
            });
    });

    router.post('', (req, res) => {
        db.collection(USERS_COLLECTION).findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Server error', raw: err });
            } else if (user) {
                return res.status(400).json({ error: `Email '${req.body.email}' is already in use.` });
            } else if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
                return res.status(400).json({ error: 'Incomplete credentials.' });
            } else {
                const newUser = {
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password,
                    group: 'user'
                };
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
                            if (err) {
                                res.status(400).json(err);
                            } else {
                                res.status(201).json(doc.ops[0]);
                            }
                        });
                    });
                });
            }
        });
    });

    router.put('/:id', function(req, res) {
        var updateDoc = req.body;
        delete updateDoc._id;

        db.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Server error', raw: err });
            } else if (!user) {
                return res.status(400).json({ error: `User not found.` });
            } else if (!updateDoc.name || !updateDoc.surname || !updateDoc.email || !updateDoc.group) {
                return res.status(400).json({ error: 'Incomplete credentials.' });
            } else if (updateDoc.password) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(updateDoc.password, salt, (err, hash) => {
                        if (err) throw err;
                        updateDoc.password = hash;
                        db.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, { $set: updateDoc }, (err, doc) => {
                            if (err) {
                                res.status(500).json({ error: 'Failed to update user.', raw: err });
                            } else {
                                updateDoc._id = req.params.id;
                                res.status(200).json(updateDoc);
                            }
                        });
                    });
                });
            } else {
                updateDoc.password = user.password;
                db.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, { $set: updateDoc }, (err, doc) => {
                    if (err) {
                        res.status(500).json({ error: 'Failed to update user', raw: err });
                    } else {
                        updateDoc._id = req.params.id;
                        res.status(200).json(updateDoc);
                    }
                });
            }
        });
    });

    router.delete('/:id', function(req, res) {
        db.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
            if (err) {
                handleError(res, err.message, 'Failed to delete user');
            } else {
                res.status(200).json(req.params.id);
            }
        });
    });

    return router;
};
