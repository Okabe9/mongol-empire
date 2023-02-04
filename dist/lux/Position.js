"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
var game_constants_json_1 = __importDefault(require("./game_constants.json"));
var DIRECTIONS = game_constants_json_1.default.DIRECTIONS;
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.isAdjacent = function (pos) {
        var dx = this.x - pos.x;
        var dy = this.y - pos.y;
        return Math.abs(dx) + Math.abs(dy) <= 1;
    };
    Position.prototype.equals = function (pos) {
        return this.x === pos.x && this.y === pos.y;
    };
    Position.prototype.translate = function (direction, units) {
        switch (direction) {
            case DIRECTIONS.NORTH:
                return new Position(this.x, this.y - units);
            case DIRECTIONS.EAST:
                return new Position(this.x + units, this.y);
            case DIRECTIONS.SOUTH:
                return new Position(this.x, this.y + units);
            case DIRECTIONS.WEST:
                return new Position(this.x - units, this.y);
            case DIRECTIONS.CENTER:
                return new Position(this.x, this.y);
        }
    };
    /** Returns Manhattan distance to pos from this position */
    Position.prototype.distanceTo = function (pos) {
        return Math.abs(pos.x - this.x) + Math.abs(pos.y - this.y);
    };
    /** Returns closest direction to targetPos, or null if staying put is best */
    Position.prototype.directionTo = function (targetPos) {
        var _this = this;
        var checkDirections = [
            DIRECTIONS.NORTH,
            DIRECTIONS.EAST,
            DIRECTIONS.SOUTH,
            DIRECTIONS.WEST,
        ];
        var closestDirection = DIRECTIONS.CENTER;
        var closestDist = this.distanceTo(targetPos);
        checkDirections.forEach(function (dir) {
            var newpos = _this.translate(dir, 1);
            var dist = targetPos.distanceTo(newpos);
            if (dist < closestDist) {
                closestDist = dist;
                closestDirection = dir;
            }
        });
        return closestDirection;
    };
    return Position;
}());
exports.Position = Position;
//# sourceMappingURL=Position.js.map