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
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
exports.users = express_1.Router();
exports.users.get('/', (req, res, next) => {
    User_1.User.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
});
exports.users.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Email is not valid').isEmail().run(req);
    yield express_validator_1.check('password', 'Password cannot be blank').isLength({ min: 1 }).run(req);
    const userDoc = req.body;
    delete userDoc._id;
    userDoc.group = 'user';
    User_1.User.findOne({ email: userDoc.email })
        .then((user) => {
        if (user)
            res.status(400).json({ message: `Użytkownik o adresie email '${userDoc.email}' już istnieje` });
        else
            return User_1.User.create(userDoc);
    })
        .then((doc) => res.json(doc))
        .catch(next);
}));
exports.users.get('/:id', (req, res, next) => {
    User_1.User.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});
exports.users.put('/:id', (req, res, next) => {
    const userDoc = req.body;
    delete userDoc._id;
    if (!userDoc.password)
        delete userDoc.password;
    User_1.User.findById(req.params.id)
        .then((user) => {
        user.set(userDoc);
        return user.save();
    })
        .then((user) => res.json(user))
        .catch(next);
});
exports.users.delete('/:id', (req, res, next) => {
    User_1.User.findByIdAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});
//# sourceMappingURL=users.js.map