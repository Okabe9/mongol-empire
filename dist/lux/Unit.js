"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
var game_constants_json_1 = __importDefault(require("./game_constants.json"));
var Position_1 = require("./Position");
var Unit = /** @class */ (function () {
    function Unit(teamid, type, unitid, x, y, cooldown, wood, coal, uranium) {
        this.pos = new Position_1.Position(x, y);
        this.team = teamid;
        this.id = unitid;
        this.type = type;
        this.cooldown = cooldown;
        this.cargo = {
            wood: wood,
            coal: coal,
            uranium: uranium
        };
    }
    Unit.prototype.isWorker = function () {
        return this.type === game_constants_json_1.default.UNIT_TYPES.WORKER;
    };
    Unit.prototype.isCart = function () {
        return this.type === game_constants_json_1.default.UNIT_TYPES.CART;
    };
    Unit.prototype.getCargoSpaceLeft = function () {
        var spaceused = this.cargo.wood + this.cargo.coal + this.cargo.uranium;
        if (this.type === game_constants_json_1.default.UNIT_TYPES.WORKER) {
            return game_constants_json_1.default.PARAMETERS.RESOURCE_CAPACITY.WORKER - spaceused;
        }
        else {
            return game_constants_json_1.default.PARAMETERS.RESOURCE_CAPACITY.CART - spaceused;
        }
    };
    /** whether or not the unit can build where it is right now */
    Unit.prototype.canBuild = function (gameMap) {
        var cell = gameMap.getCellByPos(this.pos);
        return !cell.hasResource() && this.canAct() && (this.cargo.wood + this.cargo.coal + this.cargo.uranium) >= game_constants_json_1.default.PARAMETERS.CITY_BUILD_COST;
    };
    /** whether or not the unit can act or not. This does not check for potential collisions into other units or enemy cities */
    Unit.prototype.canAct = function () {
        return this.cooldown < 1;
    };
    /** return the command to move unit in the given direction */
    Unit.prototype.move = function (dir) {
        return "m ".concat(this.id, " ").concat(dir);
    };
    /** return the command to transfer a resource from a source unit to a destination unit as specified by their ids or the units themselves */
    Unit.prototype.transfer = function (destUnitId, resourceType, amount) {
        return "t ".concat(this.id, " ").concat(destUnitId, " ").concat(resourceType, " ").concat(amount);
    };
    /** return the command to build a city right under the worker */
    Unit.prototype.buildCity = function () {
        return "bcity ".concat(this.id);
    };
    /** return the command to pillage whatever is underneath the worker */
    Unit.prototype.pillage = function () {
        return "p ".concat(this.id);
    };
    return Unit;
}());
exports.Unit = Unit;
//# sourceMappingURL=Unit.js.map