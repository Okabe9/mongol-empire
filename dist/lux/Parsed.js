"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parsed = void 0;
var Parsed = /** @class */ (function () {
    function Parsed(str, d) {
        this.str = str;
        this.contents = str.split(d);
        // remove the last element if its empty string
        if (this.contents[this.contents.length - 1] === '') {
            this.contents = this.contents.slice(0, this.contents.length - 1);
        }
        this.index = 0;
    }
    Parsed.prototype._nextStr = function () {
        if (this.index < this.contents.length) {
            return this.contents[this.index++];
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    };
    // Returns the remainder of the line as an array of integers
    Parsed.prototype.nextIntArr = function () {
        if (this.index < this.contents.length) {
            return this.contents.slice(this.index, this.contents.length).map(function (val) { return parseInt(val, 10); });
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    };
    Parsed.prototype.nextInt = function () {
        var str = this._nextStr();
        return parseInt(str, 10);
    };
    // Returns the remainder of the line as an array of floats
    Parsed.prototype.nextFloatArr = function () {
        if (this.index < this.contents.length) {
            return this.contents.slice(this.index++).map(function (val) { return parseFloat(val); });
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    };
    Parsed.prototype.nextFloat = function () {
        var str = this._nextStr();
        return parseFloat(str);
    };
    // Returns the remainder of the line as an array of strings
    Parsed.prototype.nextStrArr = function () {
        if (this.index < this.contents.length) {
            return this.contents.slice(this.index++);
        }
        else {
            throw new Error("No more contents to consume from line");
        }
    };
    Parsed.prototype.nextStr = function () {
        return this._nextStr();
    };
    return Parsed;
}());
exports.Parsed = Parsed;
//# sourceMappingURL=Parsed.js.map