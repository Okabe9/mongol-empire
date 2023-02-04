import { GameState } from "../lux/Agent";
import { Cell } from "../lux/Cell";
import { City } from "../lux/City";
import { CityTile } from "../lux/CityTile";
import { Utils } from "./Utils";
import { Player } from "../lux/Player";
import { GameMap } from "../lux/GameMap";
import { GameAgent } from "./GameAgent";
import { AgentRole } from "./AgentRole";
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
      this.enemyDir = Utils.enemyDirection(this.player, this.opponent);
    }
    this.actions = new Array<string>();
    this.player = gameState.players[gameState.id];
    this.opponent = gameState.players[(gameState.id + 1) % 2];
    this.gameMap = gameState.map;
    this.resourceTiles = Utils.getResourceTiles(this.gameMap);
    this.freeTiles = Utils.getFreeTiles(this.gameMap);
    this.cities = this.player.cities;
    Utils.cleanUp(this.agents, this.player);
    this.updatePopulation();
    this.checkUpdateRole();
    this.setAgents();
    this.stateMachine();
    return this.actions;
  }
  // ############################# STATE MACHINE #############################

  stateMachine() {
    switch (this.stage) {
      case 0:
        this.agentActions();
        this.tileActions();
        break;
    }
  }

  // ############################# ACTIONS #############################
  agentActions() {
    this.agents.forEach((agent: GameAgent) => {
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

  tileActions() {
    const city: City = this.cities.values().next().value;
    if (city !== undefined) {
      city.citytiles.forEach((tile: CityTile) => {
        this.actions.push(tile.buildWorker());
      });
    }
  }

  // ############################# AUX METHODS #############################

  // Sets Nomad role to new agents and refresh agent unit
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

  // Update population array that controls which city must be populated
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

  // Returns the id of the next city to populate
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

  // Check if the conditions to migrate to a new city are accomplished
  checkUpdateRole() {
    let city: any = this.cityPop.find(
      (city: any) => city.id === this.currentCityId()
    );
    if (city.size <= 3) {
      this.newCity = false;
    }
    if (city.tiles === this.MAX_CITY_TILES && this.newCity === false) {
      this.newCity = true;
      this.updateRoles();
    }
  }

  // Update roles to agents after populating succeessfully one city
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
}
