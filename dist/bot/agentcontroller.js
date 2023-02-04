"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
var Utils_1 = require("./Utils");
var GameAgent_1 = require("./GameAgent");
var AgentRole_1 = require("./AgentRole");
var AgentController = /** @class */ (function () {
    function AgentController() {
        this.MAX_CITY_TILES = 4;
        this.stage = 0;
        this.resourceTiles = [];
        this.freeTiles = [];
        this.agents = [];
        this.cityPop = [];
        this.newCity = false;
    }
    AgentController.prototype.update = function (gameState) {
        if (gameState.turn < 2) {
            this.enemyDir = Utils_1.Utils.enemyDirection(this.player, this.opponent);
        }
        this.actions = new Array();
        this.player = gameState.players[gameState.id];
        this.opponent = gameState.players[(gameState.id + 1) % 2];
        this.gameMap = gameState.map;
        this.resourceTiles = Utils_1.Utils.getResourceTiles(this.gameMap);
        this.freeTiles = Utils_1.Utils.getFreeTiles(this.gameMap);
        this.cities = this.player.cities;
        Utils_1.Utils.cleanUp(this.agents, this.player);
        this.updatePopulation();
        this.checkUpdateRole();
        this.setAgents();
        this.stateMachine();
        return this.actions;
    };
    // ############################# STATE MACHINE #############################
    AgentController.prototype.stateMachine = function () {
        switch (this.stage) {
            case 0:
                this.agentActions();
                this.tileActions();
                break;
        }
    };
    // ############################# ACTIONS #############################
    AgentController.prototype.agentActions = function () {
        var _this = this;
        this.agents.forEach(function (agent) {
            _this.actions.push(agent.agentActions(_this.resourceTiles, _this.freeTiles, _this.gameMap, _this.player));
        });
    };
    AgentController.prototype.tileActions = function () {
        var _this = this;
        var city = this.cities.values().next().value;
        if (city !== undefined) {
            city.citytiles.forEach(function (tile) {
                _this.actions.push(tile.buildWorker());
            });
        }
    };
    // ############################# AUX METHODS #############################
    // Sets Nomad role to new agents and refresh agent unit
    AgentController.prototype.setAgents = function () {
        var _loop_1 = function (i) {
            var unit = this_1.player.units[i];
            var assigned = this_1.agents.findIndex(function (x) { return x.id === unit.id; }) !== -1;
            if (unit.isWorker() && !assigned) {
                var aux = new GameAgent_1.GameAgent(unit);
                aux.role = AgentRole_1.AgentRole.Nomad;
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
    // Update population array that controls which city must be populated
    AgentController.prototype.updatePopulation = function () {
        var _loop_2 = function (entry) {
            var value = entry[1];
            var cityAgents = [];
            this_2.agents.forEach(function (agent) {
                if (agent.assignedCity === value.cityid) {
                    cityAgents.push(agent);
                }
            });
            this_2.cityPop.push({
                cityId: value.cityid,
                tiles: value.citytiles.length,
                agents: cityAgents,
            });
        };
        var this_2 = this;
        for (var _i = 0, _a = Array.from(this.cities.entries()); _i < _a.length; _i++) {
            var entry = _a[_i];
            _loop_2(entry);
        }
    };
    // Returns the id of the next city to populate
    AgentController.prototype.currentCityId = function () {
        var _this = this;
        var id;
        this.cityPop.forEach(function (city) {
            id = city.id;
            if (city.tiles < _this.MAX_CITY_TILES) {
                return city.id;
            }
        });
        return id;
    };
    // Check if the conditions to migrate to a new city are accomplished
    AgentController.prototype.checkUpdateRole = function () {
        var _this = this;
        var city = this.cityPop.find(function (city) { return city.id === _this.currentCityId(); });
        if (city.size <= 3) {
            this.newCity = false;
        }
        if (city.tiles === this.MAX_CITY_TILES && this.newCity === false) {
            this.newCity = true;
            this.updateRoles();
        }
    };
    // Update roles to agents after populating succeessfully one city
    AgentController.prototype.updateRoles = function () {
        var _this = this;
        var city = this.cityPop.find(function (city) { return city.id === _this.currentCityId(); });
        for (var i = 0; i < city.agents.length; i++) {
            if (i < 2) {
                var ind = this.agents.findIndex(city.agents[i]);
                this.agents[ind].role = AgentRole_1.AgentRole.Sedentarian;
            }
            else if (i == 3) {
                var ind = this.agents.findIndex(city.agents[i]);
                this.agents[ind].role = AgentRole_1.AgentRole.Nomad;
                this.agents[ind].assignedCity = null;
                this.agents[ind].target = this.enemyDir;
            }
            else {
                var ind = this.agents.findIndex(city.agents[i]);
                this.agents[ind].role = AgentRole_1.AgentRole.Suicide;
                this.agents[ind].assignedCity = null;
                this.agents[ind].target = this.enemyDir;
            }
        }
    };
    return AgentController;
}());
exports.AgentController = AgentController;
//# sourceMappingURL=AgentController.js.map