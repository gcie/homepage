"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = require("express");
exports.user = express_1.Router();
exports.user.get('/gravatarURI', (req, res) => {
    const user = req.user;
    res.status(200).json(user.gravatar(400));
});
exports.user.get('/gravatarURI/:size', (req, res) => {
    const user = req.user;
    res.status(200).json(user.gravatar(+req.params.size || 400));
});
//# sourceMappingURL=user.js.map