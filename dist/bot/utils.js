"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var game_constants_json_1 = __importDefault(require("../lux/game_constants.json"));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.findNerestResource = function (pos, resources) { };
    Utils.getResourceTiles = function (gameMap) {
        var resourceTiles = [];
        for (var y = 0; y < gameMap.height; y++) {
            for (var x = 0; x < gameMap.width; x++) {
                var cell = gameMap.getCell(x, y);
                if (cell.hasResource()) {
                    resourceTiles.push(cell);
                }
            }
        }
        return resourceTiles;
    };
    Utils.getFreeTiles = function (gameMap) {
        var freeTile = [];
        for (var y = 0; y < gameMap.height; y++) {
            for (var x = 0; x < gameMap.width; x++) {
                var cell = gameMap.getCell(x, y);
                if (!cell.hasResource() && cell.citytile === null) {
                    freeTile.push(cell);
                }
            }
        }
        return freeTile;
    };
    Utils.enemyDirection = function (player, opponent) {
        var initialPos = player.units[0].pos;
        var initialEnemyPos = opponent.units[1].pos;
        var x = initialPos.x - initialEnemyPos.x;
        var y = initialPos.y - initialEnemyPos.y;
        if (x > y) {
            if (x > 0) {
                return game_constants_json_1.default.DIRECTIONS.WEST;
            }
            else {
                return game_constants_json_1.default.DIRECTIONS.EAST;
            }
        }
        else {
            if (y > 0) {
                return game_constants_json_1.default.DIRECTIONS.NORTH;
            }
            else {
                return game_constants_json_1.default.DIRECTIONS.SOUTH;
            }
        }
    };
    Utils.cleanUp = function (arr, player) {
        var aux = arr.filter(function (agent) { return player.units.findIndex(function (l) { return l.id == agent.id; }) < 0; });
        arr = aux;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map