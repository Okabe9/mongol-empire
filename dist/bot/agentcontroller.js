"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
var Utils_1 = require("./Utils");
var GameAgent_1 = require("./GameAgent");
var AgentRole_1 = require("./AgentRole");
var AgentController = /** @class */ (function () {
    function AgentController() {
        this.stage = 0;
        this.resourceTiles = [];
        this.freeTiles = [];
        this.agents = [];
    }
    AgentController.prototype.update = function (gameState) {
        this.actions = new Array();
        this.player = gameState.players[gameState.id];
        this.opponent = gameState.players[(gameState.id + 1) % 2];
        this.gameMap = gameState.map;
        this.resourceTiles = Utils_1.Utils.getResourceTiles(this.gameMap);
        this.freeTiles = Utils_1.Utils.getFreeTiles(this.gameMap);
        this.setAgents();
        this.stateMachine();
        return this.actions;
    };
    AgentController.prototype.stateMachine = function () {
        switch (this.stage) {
            case 0:
                this.computeAgents();
                this.computeTiles();
                break;
            case 1:
                break;
            case 2:
                break;
        }
    };
    AgentController.prototype.setAgents = function () {
        var _loop_1 = function (i) {
            var unit = this_1.player.units[i];
            var assigned = this_1.agents.findIndex(function (x) { return x.id === unit.id; }) !== -1;
            if (unit.isWorker() && !assigned) {
                var aux = new GameAgent_1.GameAgent(unit);
                aux.role = this_1.nextRole();
                this_1.agents.push(aux);
            }
            else if (unit.isWorker() && assigned) {
                var id = this_1.agents.findIndex(function (x) { return x.id === unit.id; });
                this_1.agents[id].gameAgent = unit;
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.player.units.length; i++) {
            _loop_1(i);
        }
    };
    AgentController.prototype.nextRole = function () {
        return AgentRole_1.AgentRole.Sedentarian;
    };
    AgentController.prototype.computeAgents = function () {
        var _this = this;
        this.agents.forEach(function (agent) {
            agent.agentRoutine();
            _this.actions.push(agent.basicAction(_this.resourceTiles, _this.freeTiles, _this.gameMap));
        });
    };
    AgentController.prototype.computeTiles = function () {
        var _this = this;
        var city = this.player.cities.values().next().value;
        if (city !== undefined) {
            city.citytiles.forEach(function (tile) {
                _this.actions.push(tile.buildWorker());
            });
        }
        /* city.citytiles.forEach((tile) => {
          tile.buildWorker();
        }); */
    };
    return AgentController;
}());
exports.AgentController = AgentController;
//# sourceMappingURL=AgentController.js.map