import { Agent, GameState } from "../lux/Agent";
import { Cell } from "../lux/Cell";
import { City } from "../lux/City";
import { CityTile } from "../lux/CityTile";
import { Utils } from "./Utils";
import { Player } from "../lux/Player";
import { GameMap } from "../lux/GameMap";
import { GameAgent } from "./GameAgent";
import { AgentRole } from "./AgentRole";
import GAME_CONSTANTS from "../lux/game_constants.json";
export class AgentController {
  MAX_CITY_TILES = 4;
  stage: number = 0;
  actions: Array<string>;
  gameState: GameState;
  player: Player;
  opponent: Player;
  gameMap: GameMap;
  resourceTiles: Array<Cell> = [];
  freeTiles: Array<Cell> = [];
  agents: Array<GameAgent> = [];
  cities: Map<string, City>;
  tiles: Array<CityTile>;
  cityPop: Array<Object> = [];
  newCity: boolean = false;
  distanceToEnemy: number;
  enemyDir: string;
  public update(gameState: GameState): any {
    if (gameState.turn < 2) {
      this.enemyDir = this.enemyDirection();
    }
    this.actions = new Array<string>();
    this.player = gameState.players[gameState.id];
    this.opponent = gameState.players[(gameState.id + 1) % 2];
    this.gameMap = gameState.map;
    this.resourceTiles = Utils.getResourceTiles(this.gameMap);
    this.freeTiles = Utils.getFreeTiles(this.gameMap);
    this.cities = this.player.cities;
    this.updatePopulation();
    this.updateStage();
    this.setAgents();
    this.stateMachine();
    return this.actions;
  }

  updatePopulation() {
    for (let entry of Array.from(this.cities.entries())) {
      let value = entry[1];
      let cityAgents: Array<GameAgent> = [];
      this.agents.forEach((agent: GameAgent) => {
        if (agent.assignedCity === value.cityid) {
          cityAgents.push(agent);
        }
      });
      this.cityPop.push({
        cityId: value.cityid,
        tiles: value.citytiles.length,
        agents: cityAgents,
      });
    }
  }

  currentCityId() {
    let id;
    this.cityPop.forEach((city: any) => {
      id = city.id;
      if (city.tiles < this.MAX_CITY_TILES) {
        return city.id;
      }
    });
    return id;
  }

  updateStage() {
    let city: any = this.cityPop.find(
      (city: any) => city.id === this.currentCityId()
    );
    if (city.size <= 3) {
      this.newCity = false;
    }
    if (city.tiles === this.MAX_CITY_TILES && this.newCity === false) {
      this.newCity = true;
      return 1;
    }
    return 0;
  }

  stateMachine() {
    switch (this.stage) {
      case 0:
        this.computeAgents();
        this.computeTiles();
        break;
      case 1:
        this.updateRoles();
        break;
      case 2:
        break;
    }
  }

  updateRoles() {
    let city: any = this.cityPop.find(
      (city: any) => city.id === this.currentCityId()
    );
    for (let i = 0; i < city.agents.length; i++) {
      if (i < 2) {
        let ind = this.agents.findIndex(city.agents[i]);
        this.agents[ind].role = AgentRole.Sedentarian;
      } else if (i == 3) {
        let ind = this.agents.findIndex(city.agents[i]);
        this.agents[ind].role = AgentRole.Nomad;
        this.agents[ind].assignedCity = null;
        this.agents[ind].target = this.enemyDir;
      } else {
        let ind = this.agents.findIndex(city.agents[i]);
        this.agents[ind].role = AgentRole.Suicide;
        this.agents[ind].assignedCity = null;
        this.agents[ind].target = this.enemyDir;
      }
    }
  }
  setAgents() {
    for (let i = 0; i < this.player.units.length; i++) {
      const unit = this.player.units[i];
      let assigned: boolean =
        this.agents.findIndex((x) => x.id === unit.id) !== -1;
      if (unit.isWorker() && !assigned) {
        let aux = new GameAgent(unit);
        aux.role = AgentRole.Nomad;
        this.agents.push(aux);
      } else if (unit.isWorker() && assigned) {
        let id = this.agents.findIndex((x) => x.id === unit.id);
        this.agents[id].gameAgent = unit;
      }
    }
  }
  cleanUp() {
    let aux = this.agents.filter(
      (agent) => this.player.units.findIndex((l): any => l.id == agent.id) < 0
    );
    this.agents = aux;
  }

  computeAgents() {
    this.agents.forEach((agent: GameAgent) => {
      agent.agentRoutine();
      this.actions.push(
        agent.agentActions(
          this.resourceTiles,
          this.freeTiles,
          this.gameMap,
          this.player
        )
      );
    });
  }
  computeTiles() {
    const city: City = this.cities.values().next().value;
    if (city !== undefined) {
      city.citytiles.forEach((tile: CityTile) => {
        this.actions.push(tile.buildWorker());
      });
    }
    /* city.citytiles.forEach((tile) => {
      tile.buildWorker();
    }); */
  }
  enemyDirection() {
    let initialPos = this.player.units[0].pos;
    let initialEnemyPos = this.opponent.units[1].pos;

    let x = initialPos.x - initialEnemyPos.x;
    let y = initialPos.y - initialEnemyPos.y;

    if (x > y) {
      if (x > 0) {
        return GAME_CONSTANTS.DIRECTIONS.WEST;
      } else {
        return GAME_CONSTANTS.DIRECTIONS.EAST;
      }
    } else {
      if (y > 0) {
        return GAME_CONSTANTS.DIRECTIONS.NORTH;
      } else {
        return GAME_CONSTANTS.DIRECTIONS.SOUTH;
      }
    }
  }
}
