"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var game_constants_json_1 = __importDefault(require("./game_constants.json"));
/**
 * holds all data related to a player
 */
var Player = /** @class */ (function () {
    function Player(teamid) {
        this.researchPoints = 0;
        // Map unit id to the unit
        this.units = new Array();
        this.cities = new Map();
        this.cityTileCount = 0;
        this.team = teamid;
    }
    Player.prototype.researchedCoal = function () {
        return this.researchPoints >= game_constants_json_1.default.PARAMETERS.RESEARCH_REQUIREMENTS.COAL;
    };
    Player.prototype.researchedUranium = function () {
        return this.researchPoints >= game_constants_json_1.default.PARAMETERS.RESEARCH_REQUIREMENTS.URANIUM;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map