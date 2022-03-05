"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
require("../config/passport");
const User_1 = require("../models/User");
const logger_1 = __importDefault(require("../util/logger"));
const secrets_1 = require("../util/secrets");
exports.auth = express_1.Router();
/**
 * POST /login
 * Sign in using email and password.
 */
exports.auth.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Niepoprawny adres email').isEmail().run(req);
    yield express_validator_1.check('password', 'Hało nie może być puste').isLength({ min: 1 }).run(req);
    // eslint-disable-next-line @typescript-eslint/camelcase
    yield express_validator_1.body('email').normalizeEmail({ gmail_remove_dots: false }).run(req);
    logger_1.default.debug(req.body);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, raw: errors.array() });
    }
    const email = req.body.email;
    const password = req.body.password;
    User_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err)
            return res.status(500).json({ message: 'Server error', raw: err });
        if (!user)
            return res.status(400).json({ message: 'Nie znaleziono konta o podanym adresie email' });
        user.comparePassword(password, (err, isMatch) => {
            if (err)
                return res.status(500).json({ message: 'Server error', raw: err });
            if (!isMatch)
                return res.status(400).json({ message: 'Niepoprawne hasło / adres email' });
            const payload = {
                id: user._id,
                email: user.email,
            };
            jsonwebtoken_1.sign(payload, secrets_1.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err)
                    return res.status(500).json({ message: 'Server error', raw: err });
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        groups: user.groups,
                    },
                    success: true,
                    token: `Bearer ${token}`,
                    expiresIn: 36000,
                });
            });
        });
    });
}));
//# sourceMappingURL=auth.js.map