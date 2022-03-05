"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.jdoodle = void 0;
const express_1 = require("express");
const request = __importStar(require("request"));
const logger_1 = __importDefault(require("../util/logger"));
const express_validator_1 = require("express-validator");
const secrets_1 = require("../util/secrets");
exports.jdoodle = express_1.Router();
exports.jdoodle.post('/python3', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.debug(req.body);
    const JDOODLE_ENDPOINT = 'https://api.jdoodle.com/execute';
    yield express_validator_1.check('program', 'Brak programu').notEmpty().run(req);
    const body = {
        script: req.body.program,
        language: 'python3',
        versionIndex: 3,
        clientId: secrets_1.JDOODLE_CLIENT_ID,
        clientSecret: secrets_1.JDOODLE_CLIENT_SECRET,
    };
    request
        .post({
        url: JDOODLE_ENDPOINT,
        json: body,
    })
        .on('error', (error) => {
        logger_1.default.error(error);
        res.status(400).send(error);
    })
        .on('data', (data) => {
        // data is of Buffer type (array of bytes), need to be parsed to an object.
        const parsedData = JSON.parse(data.toString());
        if (parsedData.error) {
            return res.status(400).send(parsedData);
        }
        else {
            return res.status(200).send({ runResult: parsedData });
        }
    });
}));
//# sourceMappingURL=jdoodle.js.map