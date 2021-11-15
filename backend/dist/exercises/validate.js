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
exports.validate = void 0;
const execute_1 = require("./execute");
function validate(id, program) {
    return __awaiter(this, void 0, void 0, function* () {
        var prefix = '', suffix = '', rate = (output) => 0;
        if (id == 'ex000') {
            suffix = '\n\nprint(tuzin)\nprint(isinstance(tuzin, int))';
            rate = (output) => {
                return output === '12\nTrue' ? 1 : 0;
            };
        }
        const result = yield execute_1.executePython3(prefix + program + suffix);
        return Object.assign(result, { score: rate(result.output.trim()) });
    });
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map