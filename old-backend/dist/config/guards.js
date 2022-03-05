"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKorepetycjeUser = exports.isKorepetycjeManager = exports.isAdmin = void 0;
const passport_1 = require("./passport");
exports.isAdmin = [
    passport_1.isAuthenticated,
    (req, res, next) => {
        const user = req.user;
        if (user && user.groups.includes('admin')) {
            next();
        }
        else {
            res.status(401).json({ message: 'Brak uprawnień' });
        }
    },
];
exports.isKorepetycjeManager = [
    passport_1.isAuthenticated,
    (req, res, next) => {
        const user = req.user;
        if (user && user.groups.includes('korepetycje-manager')) {
            next();
        }
        else {
            res.status(401).json({ message: 'Brak uprawnień' });
        }
    },
];
exports.isKorepetycjeUser = [
    passport_1.isAuthenticated,
    (req, res, next) => {
        const user = req.user;
        if (user && user.groups.includes('korepetycje-user')) {
            next();
        }
        else {
            res.status(401).json({ message: 'Brak uprawnień.' });
        }
    },
];
//# sourceMappingURL=guards.js.map