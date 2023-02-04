import { Cell } from '../lux/Cell';
import { GameMap } from '../lux/GameMap';
export declare class Utils {
    static findNerestResource(pos: Array<number>, resources: Array<Cell>): void;
    static getResourceTiles(gameMap: GameMap): Array<Cell>;
    static getFreeTiles(gameMap: GameMap): Array<Cell>;
}
