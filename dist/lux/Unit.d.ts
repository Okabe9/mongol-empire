import { Position } from "./Position";
import { GameMap } from "./GameMap";
export interface Cargo {
    wood: number;
    coal: number;
    uranium: number;
}
export declare class Unit {
    team: number;
    type: number;
    id: string;
    pos: Position;
    cooldown: number;
    cargo: Cargo;
    constructor(teamid: number, type: number, unitid: string, x: number, y: number, cooldown: number, wood: number, coal: number, uranium: number);
    isWorker(): boolean;
    isCart(): boolean;
    getCargoSpaceLeft(): number;
    /** whether or not the unit can build where it is right now */
    canBuild(gameMap: GameMap): boolean;
    /** whether or not the unit can act or not. This does not check for potential collisions into other units or enemy cities */
    canAct(): boolean;
    /** return the command to move unit in the given direction */
    move(dir: string): string;
    /** return the command to transfer a resource from a source unit to a destination unit as specified by their ids or the units themselves */
    transfer(destUnitId: string, resourceType: string, amount: number): string;
    /** return the command to build a city right under the worker */
    buildCity(): string;
    /** return the command to pillage whatever is underneath the worker */
    pillage(): string;
}
