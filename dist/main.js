"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AgentController_1 = require("./bot/AgentController");
var Agent_1 = require("./lux/Agent");
// any state can be stored between ticks by defining variable here
// note that game objects are recreated every tick so make sure to update them
var agent = new Agent_1.Agent();
var controller = new AgentController_1.AgentController();
// agent.run takes care of running your code per tick
agent.run(function (gameState) {
    return controller.update(gameState);
});
//# sourceMappingURL=main.js.map