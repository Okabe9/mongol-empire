/** CityTile and Unit are both actionable and can return action strings to send to engine  */
import { Position } from "./Position";
export declare class CityTile {
    team: number;
    cityid: string;
    pos: Position;
    cooldown: number;
    constructor(teamid: number, cityid: string, x: number, y: number, cooldown: number);
    /** Whether or not this unit can research or build */
    canAct(): boolean;
    /** returns command to ask this tile to research this turn */
    research(): string;
    /** returns command to ask this tile to build a worker this turn */
    buildWorker(): string;
    /** returns command to ask this tile to build a cart this turn */
    buildCart(): string;
}
