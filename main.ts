import { AgentController } from './bot/AgentController';
import { Agent, GameState } from './lux/Agent';
// any state can be stored between ticks by defining variable here
// note that game objects are recreated every tick so make sure to update them

const agent = new Agent();
const controller = new AgentController();
// agent.run takes care of running your code per tick
agent.run((gameState: GameState): Array<string> => {
  return controller.update(gameState);
});
