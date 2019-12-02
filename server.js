var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

var ObjectID = mongodb.ObjectID;

const secret = process.env.SECRET || 'default secret';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

// passport's authentication setup

var USERS_COLLECTION = 'users';

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

passport.use(
    new Strategy(opts, (payload, done) => {
        db.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(payload.id), login: payload.login }, function(err, user) {
            if (err) {
                done(err);
            } else if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    })
);

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

        // Introduce routes
        app.use('/api/pupils', passport.authenticate('jwt', { session: false }), require('./api/pupils')(db));
        app.use('/', express.static(__dirname + '/dist'));
        app.use('/login', express.static(__dirname + '/dist'));
        app.use('/register', express.static(__dirname + '/dist'));

        // Initialize the app.
        var server = app.listen(process.env.PORT || 8080, function() {
            var port = server.address().port;
            console.log('App now running on port', port);
        });
    }
);

app.post('/signup', (req, res) => {
    db.collection(USERS_COLLECTION).findOne({ login: req.body.login }, (err, user) => {
        if (user) {
            return res.status(400).json({ error: 'Login exists in database.' });
        } else {
            const newUser = {
                login: req.body.login,
                password: req.body.password
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

app.post('/signin', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    db.collection(USERS_COLLECTION).findOne({ login }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error while finding user', raw: err });
        }
        if (!user) {
            return res.status(404).json({ error: 'No account found' });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user._id,
                    login: user.login
                };
                jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
                    if (err) res.status(500).json({ error: 'Error signing token', raw: err });
                    res.json({
                        success: true,
                        token: `Bearer ${token}`,
                        expiresIn: 36000
                    });
                });
            } else {
                res.status(400).json({ error: 'Password is incorrect' });
            }
        });
    });
});
