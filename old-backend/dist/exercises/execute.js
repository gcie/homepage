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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePython3 = void 0;
const request = __importStar(require("request"));
const logger_1 = __importDefault(require("../util/logger"));
const secrets_1 = require("../util/secrets");
function executePython3(program) {
    const JDOODLE_ENDPOINT = 'https://api.jdoodle.com/execute';
    const body = {
        script: program,
        language: 'python3',
        versionIndex: 3,
        clientId: secrets_1.JDOODLE_CLIENT_ID,
        clientSecret: secrets_1.JDOODLE_CLIENT_SECRET,
    };
    return new Promise((resolve, reject) => {
        request
            .post({
            url: JDOODLE_ENDPOINT,
            json: body,
        })
            .on('error', (error) => {
            logger_1.default.error(error);
            reject();
        })
            .on('data', (data) => {
            // data is of Buffer type (array of bytes), need to be parsed to an object.
            const parsedData = JSON.parse(data.toString());
            if (parsedData.error) {
                logger_1.default.error(parsedData.error);
                reject();
            }
            else {
                resolve({
                    output: parsedData.output,
                    statusCode: parsedData.statusCode,
                    memory: +parsedData.memory,
                    cpuTime: +parsedData.cpuTime,
                });
            }
        });
    });
}
exports.executePython3 = executePython3;
//# sourceMappingURL=execute.js.map