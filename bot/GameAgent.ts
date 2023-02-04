import { Cell } from '../lux/Cell';
import { Unit } from '../lux/Unit';
import { AgentRole } from './AgentRole';
import GAME_CONSTANTS from '../lux/game_constants.json';
import { City } from '../lux/City';
import { Player } from '../lux/Player';
import { CityTile } from '../lux/CityTile';
import { GameMap } from '../lux/GameMap';

export class GameAgent {
  gameAgent: Unit;
  id: string;
  canGather: boolean = true;
  role: AgentRole;
  constructor(ag: Unit) {
    this.gameAgent = ag;
    this.id = this.gameAgent.id;
  }

  agentRoutine() {
    this.canGather = this.gameAgent.getCargoSpaceLeft() !== 0;
  }
  basicAction(
    resourceTiles: Array<Cell>,
    freeTiles: Array<Cell>,
    gameMap: GameMap
  ): string {
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
      /* if (player.cities.size > 0) {
          const city: City = player.cities.values().next().value;
          let closestCityTile = this.getClosestCell(city.citytiles);
          return this.moveToCell(closestCityTile);
        }*/
    }
  }

  getClosestCell(arr: Array<Cell> | any) {
    let closestCell: Cell = null;
    let closestDist = 9999999;
    arr.forEach((cell) => {
      const dist = cell.pos.distanceTo(this.gameAgent.pos);
      if (dist < closestDist) {
        closestDist = dist;
        closestCell = cell;
      }
    });
    return closestCell;
  }
  moveToCell(cell) {
    if (cell !== null) {
      const dir = this.gameAgent.pos.directionTo(cell.pos);
      return this.gameAgent.move(dir);
    }
  }
}
