"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameAgent = void 0;
var game_constants_json_1 = __importDefault(require("../lux/game_constants.json"));
var GameAgent = /** @class */ (function () {
    function GameAgent(ag) {
        this.canGather = true;
        this.gameAgent = ag;
        this.id = this.gameAgent.id;
    }
    GameAgent.prototype.agentRoutine = function () {
        this.canGather = this.gameAgent.getCargoSpaceLeft() !== 0;
    };
    GameAgent.prototype.basicAction = function (resourceTiles, freeTiles, gameMap) {
        // we iterate over all our units and do something with them
        if (this.gameAgent.canAct()) {
            if (this.canGather) {
                // if the this.gameAgent is a worker and we have space in cargo, lets find the nearest resource tile and try to mine it
                var woodTiles = resourceTiles.filter(function (cell) { return cell.resource.type === game_constants_json_1.default.RESOURCE_TYPES.WOOD; });
                var closestResourceTile = this.getClosestCell(woodTiles);
                return this.moveToCell(closestResourceTile);
            }
            else if (this.gameAgent.canBuild(gameMap)) {
                return this.gameAgent.buildCity();
            }
            else {
                var closestFreeTile = this.getClosestCell(freeTiles);
                return this.moveToCell(closestFreeTile);
            }
        }
        else {
            // if this.gameAgent is a worker and there is no cargo space left, and we have cities, lets return to them
            /* if (player.cities.size > 0) {
                const city: City = player.cities.values().next().value;
                let closestCityTile = this.getClosestCell(city.citytiles);
                return this.moveToCell(closestCityTile);
              }*/
        }
    };
    GameAgent.prototype.getClosestCell = function (arr) {
        var _this = this;
        var closestCell = null;
        var closestDist = 9999999;
        arr.forEach(function (cell) {
            var dist = cell.pos.distanceTo(_this.gameAgent.pos);
            if (dist < closestDist) {
                closestDist = dist;
                closestCell = cell;
            }
        });
        return closestCell;
    };
    GameAgent.prototype.moveToCell = function (cell) {
        if (cell !== null) {
            var dir = this.gameAgent.pos.directionTo(cell.pos);
            return this.gameAgent.move(dir);
        }
    };
    return GameAgent;
}());
exports.GameAgent = GameAgent;
//# sourceMappingURL=GameAgent.js.map