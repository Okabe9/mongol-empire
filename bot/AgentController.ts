import { Agent, GameState } from '../lux/Agent';
import GAME_CONSTANTS from '../lux/game_constants.json';
import { Cell } from '../lux/Cell';
import { City } from '../lux/City';
import { CityTile } from '../lux/CityTile';
import { Utils } from './Utils';
import { Player } from '../lux/Player';
import { GameMap } from '../lux/GameMap';
import { GameAgent } from './GameAgent';
import { AgentRole } from './AgentRole';
import { timeEnd } from 'console';

export class AgentController {
  stage: number = 0;
  actions: Array<string>;
  gameState: GameState;
  player: Player;
  opponent: Player;
  gameMap: GameMap;
  resourceTiles: Array<Cell> = [];
  freeTiles: Array<Cell> = [];
  agents: Array<GameAgent> = [];
  public update(gameState: GameState): any {
    this.actions = new Array<string>();
    this.player = gameState.players[gameState.id];
    this.opponent = gameState.players[(gameState.id + 1) % 2];
    this.gameMap = gameState.map;
    this.resourceTiles = Utils.getResourceTiles(this.gameMap);
    this.freeTiles = Utils.getFreeTiles(this.gameMap);
    this.setAgents();
    this.stateMachine();
    return this.actions;
  }

  stateMachine() {
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
  }

  setAgents() {
    for (let i = 0; i < this.player.units.length; i++) {
      const unit = this.player.units[i];
      let assigned: boolean =
        this.agents.findIndex((x) => x.id === unit.id) !== -1;
      if (unit.isWorker() && !assigned) {
        let aux = new GameAgent(unit);
        aux.role = this.nextRole();
        this.agents.push(aux);
      } else if (unit.isWorker() && assigned) {
        let id = this.agents.findIndex((x) => x.id === unit.id);
        this.agents[id].gameAgent = unit;
      }
    }
  }

  nextRole(): AgentRole {
    return AgentRole.Sedentarian;
  }

  computeAgents() {
    this.agents.forEach((agent: GameAgent) => {
      agent.agentRoutine();
      this.actions.push(
        agent.basicAction(this.resourceTiles, this.freeTiles, this.gameMap)
      );
    });
  }
  computeTiles() {
    const city: City = this.player.cities.values().next().value;
    if (city !== undefined) {
      city.citytiles.forEach((tile: CityTile) => {
        this.actions.push(tile.buildWorker());
      });
    }
    /* city.citytiles.forEach((tile) => {
      tile.buildWorker();
    }); */
  }
}
