import { Cell } from "../lux/Cell";
import { Unit } from "../lux/Unit";
import { AgentRole } from "./AgentRole";
import GAME_CONSTANTS from "../lux/game_constants.json";
import { GameMap } from "../lux/GameMap";
import { Player } from "../lux/Player";
import { City } from "../lux/City";

export class GameAgent {
  gameAgent: Unit;
  id: string;
  canGather: boolean = true;
  role: AgentRole;
  assignedCity: string;
  target: string;
  turnsRunning: 0;
  constructor(ag: Unit) {
    this.gameAgent = ag;
    this.id = this.gameAgent.id;
  }

  // ############################# Machine State #############################
  agentActions(
    resourceTiles: Array<Cell>,
    freeTiles: Array<Cell>,
    gameMap: GameMap,
    player: Player
  ): string {
    this.canGather = this.gameAgent.getCargoSpaceLeft() !== 0;

    switch (this.role) {
      case AgentRole.Nomad:
        return this.nomadAgent(resourceTiles, freeTiles, gameMap);
      case AgentRole.Sedentarian:
        return this.sedentarianAgent(resourceTiles, freeTiles, gameMap, player);
      /*  case AgentRole.Suicide:
        return this.suicideAgent(resourceTiles, freeTiles, gameMap); */
    }
  }

  // ############################# Agent Behaviour #############################
  nomadAgent(
    resourceTiles: Array<Cell>,
    freeTiles: Array<Cell>,
    gameMap: GameMap
  ) {
    // we iterate over all our units and do something with them
    if (this.gameAgent.canAct()) {
      if (this.turnsRunning < 10) {
        this.turnsRunning += 1;
        return this.moveToDir(this.target);
      }
      if (this.canGather) {
        // if the this.gameAgent is a worker and we have space in cargo, lets find the nearest resource tile and try to mine it
        let woodTiles = resourceTiles.filter(
          (cell) => cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.WOOD
        );
        let closestResourceTile = this.getClosestCell(woodTiles);
        return this.moveToCell(closestResourceTile);
      } else if (this.gameAgent.canBuild(gameMap)) {
        return this.gameAgent.buildCity();
      } else {
        let closestFreeTile = this.getClosestCell(freeTiles);
        return this.moveToCell(closestFreeTile);
      }
    }
  }
  sedentarianAgent(
    resourceTiles: Array<Cell>,
    freeTiles: Array<Cell>,
    gameMap: GameMap,
    player: Player
  ) {
    // we iterate over all our units and do something with them
    if (this.gameAgent.canAct()) {
      if (this.canGather) {
        // if the this.gameAgent is a worker and we have space in cargo, lets find the nearest resource tile and try to mine it
        let woodTiles = resourceTiles.filter(
          (cell) => cell.resource.type === GAME_CONSTANTS.RESOURCE_TYPES.WOOD
        );
        let closestResourceTile = this.getClosestCell(woodTiles);
        return this.moveToCell(closestResourceTile);
      } else if (this.gameAgent.canBuild(gameMap)) {
        return this.gameAgent.buildCity();
      } else {
        let closestFreeTile = this.getClosestCell(freeTiles);
        return this.moveToCell(closestFreeTile);
      }
    } else {
      // if this.gameAgent is a worker and there is no cargo space left, and we have cities, lets return to them
      if (player.cities.size > 0) {
        const city: City = player.cities.values().next().value;
        let closestCityTile = this.getClosestCell(city.citytiles);
        return this.moveToCell(closestCityTile);
      }
    }
  }

  // ############################# Aux Methods  #############################
  getClosestCell(arr: Array<Cell> | any) {
    let closestCell: Cell = null;
    let closestDist = 9999999;
    arr.forEach((cell: Cell) => {
      const dist = cell.pos.distanceTo(this.gameAgent.pos);
      if (dist < closestDist) {
        closestDist = dist;
        closestCell = cell;
      }
    });
    return closestCell;
  }
  moveToCell(cell: Cell) {
    if (cell !== null) {
      const dir = this.gameAgent.pos.directionTo(cell.pos);
      return this.gameAgent.move(dir);
    }
  }
  moveToDir(dir: string) {
    return this.gameAgent.move(dir);
  }
}
