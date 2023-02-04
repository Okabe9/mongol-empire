import { Position } from "./Position";
import { CityTile } from "./CityTile";
export interface Resource {
    type: string;
    amount: number;
}
export declare class Cell {
    pos: Position;
    resource: Resource;
    citytile: CityTile;
    road: number;
    constructor(x: number, y: number);
    hasResource(): boolean;
}
