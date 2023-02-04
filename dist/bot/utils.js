"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
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
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map