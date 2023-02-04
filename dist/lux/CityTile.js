"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityTile = void 0;
/** CityTile and Unit are both actionable and can return action strings to send to engine  */
var Position_1 = require("./Position");
var CityTile = /** @class */ (function () {
    function CityTile(teamid, cityid, x, y, cooldown) {
        this.cityid = cityid;
        this.team = teamid;
        this.pos = new Position_1.Position(x, y);
        this.cooldown = cooldown;
    }
    /** Whether or not this unit can research or build */
    CityTile.prototype.canAct = function () {
        return this.cooldown < 1;
    };
    /** returns command to ask this tile to research this turn */
    CityTile.prototype.research = function () {
        return "r ".concat(this.pos.x, " ").concat(this.pos.y);
    };
    /** returns command to ask this tile to build a worker this turn */
    CityTile.prototype.buildWorker = function () {
        return "bw ".concat(this.pos.x, " ").concat(this.pos.y);
    };
    /** returns command to ask this tile to build a cart this turn */
    CityTile.prototype.buildCart = function () {
        return "bc ".concat(this.pos.x, " ").concat(this.pos.y);
    };
    return CityTile;
}());
exports.CityTile = CityTile;
//# sourceMappingURL=CityTile.js.map