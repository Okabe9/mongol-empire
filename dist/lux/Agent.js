"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotate = exports.Agent = void 0;
var readline_1 = __importDefault(require("readline"));
var Player_1 = require("./Player");
var GameMap_1 = require("./GameMap");
var City_1 = require("./City");
var Unit_1 = require("./Unit");
var Parser_1 = require("./Parser");
var io_1 = require("./io");
// Create parser and use ',' as the delimiter between commands being sent by the `Match` and `MatchEngine`
var parse = new Parser_1.Parser(' ');
/**
 * Agent for sequential `Designs`
 */
var Agent = /** @class */ (function () {
    /**
     * Constructor for a new agent
     * User should edit this according to the `Design` this agent will compete under
     */
    function Agent() {
        this._setup(); // DO NOT REMOVE
    }
    Agent.prototype._setup = function () {
        var _this = this;
        // Prepare to read input
        var rl = readline_1.default.createInterface({
            input: process.stdin,
            output: null,
        });
        var buffer = [];
        var currentResolve;
        var currentPromise;
        var makePromise = function () {
            return new Promise(function (resolve) {
                currentResolve = resolve;
            });
        };
        // on each line, push line to buffer
        rl.on('line', function (line) {
            buffer.push(line);
            currentResolve();
            currentPromise = makePromise();
        });
        // The current promise for retrieving the next line
        currentPromise = makePromise();
        // with await, we pause process until there is input
        this.getLine = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(buffer.length === 0)) return [3 /*break*/, 2];
                                    // pause while buffer is empty, continue if new line read
                                    return [4 /*yield*/, currentPromise];
                                case 1:
                                    // pause while buffer is empty, continue if new line read
                                    _a.sent();
                                    return [3 /*break*/, 0];
                                case 2:
                                    // once buffer is not empty, resolve the most recent line in stdin, and remove it
                                    resolve(parse(buffer.shift()));
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        }); };
    };
    /**
     * Initialize Agent for the `Match`
     * User should edit this according to their `Design`
     */
    Agent.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, mapInfo, width, height, map, players;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLine()];
                    case 1:
                        id = (_a.sent()).nextInt();
                        return [4 /*yield*/, this.getLine()];
                    case 2:
                        mapInfo = (_a.sent());
                        width = mapInfo.nextInt();
                        height = mapInfo.nextInt();
                        map = new GameMap_1.GameMap(width, height);
                        players = [new Player_1.Player(0), new Player_1.Player(1)];
                        this.gameState = {
                            id: id,
                            map: map,
                            players: players,
                            turn: -1,
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates agent's own known state of `Match`
     * User should edit this according to their `Design`.
     */
    Agent.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.gameState.turn++;
                        // wait for the engine to send any updates
                        return [4 /*yield*/, this.retrieveUpdates()];
                    case 1:
                        // wait for the engine to send any updates
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Agent.prototype.resetPlayerStates = function () {
        var players = this.gameState.players;
        players[0].units = [];
        players[0].cities = new Map();
        players[0].cityTileCount = 0;
        players[1].units = [];
        players[1].cities = new Map();
        players[1].cityTileCount = 0;
    };
    Agent.prototype.retrieveUpdates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var update, inputIdentifier, team, type, x, y, amt, unittype, team, unitid, x, y, cooldown, wood, coal, uranium, team, cityid, fuel, lightUpkeep, team, cityid, x, y, cooldown, city, citytile, x, y, road;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.resetPlayerStates();
                        // TODO: this can be optimized. we only reset because some resources get removed
                        this.gameState.map = new GameMap_1.GameMap(this.gameState.map.width, this.gameState.map.height);
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getLine()];
                    case 2:
                        update = (_a.sent());
                        if (update.str === io_1.INPUT_CONSTANTS.DONE) {
                            return [3 /*break*/, 3];
                        }
                        inputIdentifier = update.nextStr();
                        switch (inputIdentifier) {
                            case io_1.INPUT_CONSTANTS.RESEARCH_POINTS: {
                                team = update.nextInt();
                                this.gameState.players[team].researchPoints = update.nextInt();
                                break;
                            }
                            case io_1.INPUT_CONSTANTS.RESOURCES: {
                                type = update.nextStr();
                                x = update.nextInt();
                                y = update.nextInt();
                                amt = update.nextInt();
                                this.gameState.map._setResource(type, x, y, amt);
                                break;
                            }
                            case io_1.INPUT_CONSTANTS.UNITS: {
                                unittype = update.nextInt();
                                team = update.nextInt();
                                unitid = update.nextStr();
                                x = update.nextInt();
                                y = update.nextInt();
                                cooldown = update.nextFloat();
                                wood = update.nextInt();
                                coal = update.nextInt();
                                uranium = update.nextInt();
                                this.gameState.players[team].units.push(new Unit_1.Unit(team, unittype, unitid, x, y, cooldown, wood, coal, uranium));
                                break;
                            }
                            case io_1.INPUT_CONSTANTS.CITY: {
                                team = update.nextInt();
                                cityid = update.nextStr();
                                fuel = update.nextFloat();
                                lightUpkeep = update.nextFloat();
                                this.gameState.players[team].cities.set(cityid, new City_1.City(team, cityid, fuel, lightUpkeep));
                                break;
                            }
                            case io_1.INPUT_CONSTANTS.CITY_TILES: {
                                team = update.nextInt();
                                cityid = update.nextStr();
                                x = update.nextInt();
                                y = update.nextInt();
                                cooldown = update.nextFloat();
                                city = this.gameState.players[team].cities.get(cityid);
                                citytile = city.addCityTile(x, y, cooldown);
                                this.gameState.map.getCell(x, y).citytile = citytile;
                                this.gameState.players[team].cityTileCount += 1;
                                break;
                            }
                            case io_1.INPUT_CONSTANTS.ROADS: {
                                x = update.nextInt();
                                y = update.nextInt();
                                road = update.nextFloat();
                                this.gameState.map.getCell(x, y).road = road;
                                break;
                            }
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * End a turn
     */
    Agent.prototype.endTurn = function () {
        console.log('D_FINISH');
    };
    Agent.prototype.run = function (loop) {
        return __awaiter(this, void 0, void 0, function () {
            var actions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.update()];
                    case 3:
                        _a.sent();
                        try {
                            actions = loop(this.gameState);
                            console.log(actions.join(","));
                        }
                        catch (err) {
                            console.log(err);
                        }
                        this.endTurn();
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Agent;
}());
exports.Agent = Agent;
exports.annotate = {
    circle: function (x, y) {
        return "dc ".concat(x, " ").concat(y);
    },
    x: function (x, y) {
        return "dx ".concat(x, " ").concat(y);
    },
    line: function (x1, y1, x2, y2) {
        return "dl ".concat(x1, " ").concat(y1, " ").concat(x2, " ").concat(y2);
    },
    text: function (x1, y1, message, fontsize) {
        if (fontsize === void 0) { fontsize = 16; }
        return "dt ".concat(x1, " ").concat(y1, " '").concat(message, "' ").concat(fontsize);
    },
    sidetext: function (message) {
        return "dst '".concat(message, "'");
    }
};
//# sourceMappingURL=Agent.js.map