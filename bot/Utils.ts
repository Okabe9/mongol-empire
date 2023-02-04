import internal from 'stream';
import { Cell } from '../lux/Cell';
import { GameMap } from '../lux/GameMap';

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
}
