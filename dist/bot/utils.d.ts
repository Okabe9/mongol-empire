import { Cell } from "../lux/Cell";
import { GameMap } from "../lux/GameMap";
import { Player } from "../lux/Player";
export declare class Utils {
    static findNerestResource(pos: Array<number>, resources: Array<Cell>): void;
    static getResourceTiles(gameMap: GameMap): Array<Cell>;
    static getFreeTiles(gameMap: GameMap): Array<Cell>;
    static enemyDirection(player: Player, opponent: Player): string;
    static cleanUp(arr: Array<any>, player: Player): void;
}
