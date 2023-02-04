"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var Position_1 = require("./Position");
var Cell = /** @class */ (function () {
    function Cell(x, y) {
        this.resource = null;
        this.citytile = null;
        this.road = 0;
        this.pos = new Position_1.Position(x, y);
    }
    Cell.prototype.hasResource = function () {
        return this.resource !== null && this.resource.amount > 0;
    };
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map