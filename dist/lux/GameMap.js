"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
var Cell_1 = require("./Cell");
var GameMap = /** @class */ (function () {
    function GameMap(width, height) {
        this.height = height;
        this.width = width;
        this.map = new Array(this.height);
        for (var y = 0; y < this.height; y++) {
            this.map[y] = new Array(this.width);
            for (var x = 0; x < this.width; x++) {
                this.map[y][x] = new Cell_1.Cell(x, y);
            }
        }
    }
    GameMap.prototype.getCellByPos = function (pos) {
        return this.map[pos.y][pos.x];
    };
    GameMap.prototype.getCell = function (x, y) {
        return this.map[y][x];
    };
    GameMap.prototype._setResource = function (type, x, y, amount) {
        var cell = this.getCell(x, y);
        cell.resource = {
            type: type,
            amount: amount
        };
    };
    return GameMap;
}());
exports.GameMap = GameMap;
//# sourceMappingURL=GameMap.js.map