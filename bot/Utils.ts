import internal from "stream";
import { Cell } from "../lux/Cell";
import { GameMap } from "../lux/GameMap";
import { Player } from "../lux/Player";
import GAME_CONSTANTS from "../lux/game_constants.json";
import { AnyTxtRecord } from "dns";

export class Utils {
  static findNerestResource(pos: Array<number>, resources: Array<Cell>) {}

  static getResourceTiles(gameMap: GameMap): Array<Cell> {
    const resourceTiles: Array<Cell> = [];
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        const cell = gameMap.getCell(x, y);
        if (cell.hasResource()) {
          resourceTiles.push(cell);
        }
      }
    }
    return resourceTiles;
  }

  static getFreeTiles(gameMap: GameMap): Array<Cell> {
    const freeTile: Array<Cell> = [];
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        const cell = gameMap.getCell(x, y);
        if (!cell.hasResource() && cell.citytile === null) {
          freeTile.push(cell);
        }
      }
    }
    return freeTile;
  }

  static enemyDirection(player: Player, opponent: Player) {
    let initialPos = player.units[0].pos;
    let initialEnemyPos = opponent.units[1].pos;

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

  static cleanUp(arr: Array<any>, player: Player) {
    let aux = arr.filter(
      (agent) => player.units.findIndex((l): any => l.id == agent.id) < 0
    );
    arr = aux;
  }
}
