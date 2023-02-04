import { Cell } from "./Cell";
import { Position } from "./Position";
export declare class GameMap {
    width: number;
    height: number;
    map: Array<Array<Cell>>;
    constructor(width: number, height: number);
    getCellByPos(pos: Position): Cell;
    getCell(x: number, y: number): Cell;
    _setResource(type: string, x: number, y: number, amount: number): void;
}
