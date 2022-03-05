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
const logger_1 = __importDefault(require("../util/logger"));
const execute_1 = require("./execute");
function validate(id, program) {
    return __awaiter(this, void 0, void 0, function* () {
        var prefix = '', suffix = '', check = (output) => true;
        logger_1.default.log('debug', 'validating ' + program);
        if (id == 'ex000') {
            suffix = '\n\nprint(x)\nprint(isinstance(x, int))';
            check = (output) => {
                logger_1.default.debug('program output: ' + output);
                return output.trim() === '12\nTrue';
            };
        }
        const result = yield execute_1.executePython3(prefix + program + suffix);
        logger_1.default.debug(`jdoodle response: ${result}`);
        return check(result.output);
    });
}
exports.validate = validate;
