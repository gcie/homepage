const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

var ObjectID = mongodb.ObjectID;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET || 'default secret'
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

function group(group) {
    return (req, res, next) => {
        console.log(req.user);
        if (req.user.group === group) {
            next();
        } else {
            res.status(401).json({
                error: `Unauthorized, requires permission group "${group}", but you have group ${req.body.user.group}`
            });
        }
    };
}

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
        app.use('/api/auth', require('./api/auth')(db));
        app.use('/api/users', passport.authenticate('jwt', { session: false }), group('admin'), require('./api/users')(db));
        app.use('/login', express.static(__dirname + '/dist'));
        app.use('/register', passport.authenticate('jwt', { session: false }), express.static(__dirname + '/dist'));
        app.use('/', express.static(__dirname + '/dist'));

        // Initialize the app.
        var server = app.listen(process.env.PORT || 8080, function() {
            var port = server.address().port;
            console.log('App now running on port', port);
        });
    }
);
