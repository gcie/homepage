"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = __importDefault(require("bluebird"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_1 = __importDefault(require("express"));
const lusca_1 = __importDefault(require("lusca"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const guards_1 = require("./config/guards");
const passport_2 = require("./config/passport");
const controllers_1 = require("./controllers");
const python_course_1 = require("./controllers/python-course");
const logger_1 = __importDefault(require("./util/logger"));
const secrets_1 = require("./util/secrets");
// Create Express server
const app = express_1.default();
// Connect to MongoDB
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default
    .connect(mongoUrl)
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
})
    .catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
});
// Express configuration
app.set('port', secrets_1.PORT);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(lusca_1.default.xframe('SAMEORIGIN'));
app.use(lusca_1.default.xssProtection(true));
/**
 * API routes.
 */
app.use('/api/korepetycje/pupils', guards_1.isKorepetycjeUser, controllers_1.pupils);
app.use('/api/korepetycje/tutors', guards_1.isKorepetycjeUser, controllers_1.tutors);
app.use('/api/users', guards_1.isAdmin, controllers_1.users);
app.use('/api/user', passport_2.isAuthenticated, controllers_1.user);
app.use('/api/jdoodle', passport_2.isAuthenticated, controllers_1.jdoodle);
app.use('/api/python-course', python_course_1.pythonCourse);
/**
 * Authentication routes
 */
app.use('/auth', controllers_1.auth);
/**
 * Angular app host.
 */
app.use(express_1.default.static(path_1.default.join(__dirname, '/../../client/dist'), { maxAge: 31557600000 }));
app.all('/*', (req, res) => {
    res.sendFile('index.html', { root: path_1.default.join(__dirname, '/../../client/dist') });
});
/**
 * Default error handler
 */
app.use((err, req, res, next) => {
    logger_1.default.error('', err);
    if (secrets_1.ENVIRONMENT === 'production') {
        res.status(500).json({ message: 'Server error' });
    }
    else {
        res.status(500).json({ message: 'Server error', raw: err });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map