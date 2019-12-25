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

app.use(passport.initialize());

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

        var permissions = require('./api/permissions');
        var guards = permissions.createGuards(passport.authenticate('jwt', { session: false }));

        // Introduce routes
        app.use('/api/pupils', passport.authenticate('jwt', { session: false }), require('./api/pupils')(db, guards));
        app.use('/api/tutors', passport.authenticate('jwt', { session: false }), require('./api/tutors')(db, guards));
        app.use('/api/auth', require('./api/auth')(db));
        app.use('/api/users', guards.authenticated, guards.admin, require('./api/users')(db));
        app.use('/login', express.static(__dirname + '/dist'));
        app.use('/register', guards.authenticated, express.static(__dirname + '/dist'));
        app.use('/', express.static(__dirname + '/dist'));

        // Initialize the app.
        var server = app.listen(process.env.PORT || 8080, function() {
            var port = server.address().port;
            console.log('App now running on port', port);
        });
    }
);
