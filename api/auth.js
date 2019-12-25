var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var router = express.Router();
var USERS_COLLECTION = 'users';
const secret = process.env.SECRET || 'default secret';

module.exports = function(db) {
    router.post('/register', (req, res) => {
        db.collection(USERS_COLLECTION).findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Server error', raw: err });
            } else if (user) {
                return res.status(400).json({ message: `Adres email '${req.body.email}' jest już w użyciu.` });
            } else if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
                return res.status(400).json({ message: 'Niekompletne dane logowania.' });
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

    router.post('/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        db.collection(USERS_COLLECTION).findOne({ email }, (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Server error', raw: err });
            }
            if (!user) {
                return res.status(400).json({ message: 'Nie znaleziono konta o podanym adresie email' });
            }
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    const payload = {
                        id: user._id,
                        email: user.email
                    };
                    jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
                        if (err) res.status(500).json({ message: 'Error signing token', raw: err });
                        res.json({
                            user: {
                                name: user.name,
                                surname: user.surname,
                                email: user.email,
                                group: user.group
                            },
                            success: true,
                            token: `Bearer ${token}`,
                            expiresIn: 36000
                        });
                    });
                } else {
                    res.status(400).json({ message: 'Niepoprawne hasło / adres email' });
                }
            });
        });
    });

    return router;
};
