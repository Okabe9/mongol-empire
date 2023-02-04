"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var Parsed_1 = require("./Parsed");
/**
 * Parser class to help parse a input line of data
 */
var Parser = /** @class */ (function () {
    function Parser(d) {
        if (d === void 0) { d = ','; }
        this.delimiter = d;
        return this.parse.bind(this);
    }
    Parser.prototype.setDelimeter = function (s) {
        this.delimiter = s;
    };
    Parser.prototype.parse = function (str) {
        return new Parsed_1.Parsed(str, this.delimiter);
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map