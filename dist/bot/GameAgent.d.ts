import { Cell } from "../lux/Cell";
import { Unit } from "../lux/Unit";
import { AgentRole } from "./AgentRole";
import { GameMap } from "../lux/GameMap";
import { Player } from "../lux/Player";
export declare class GameAgent {
    gameAgent: Unit;
    id: string;
    canGather: boolean;
    role: AgentRole;
    assignedCity: string;
    target: string;
    turnsRunning: 0;
    constructor(ag: Unit);
    agentActions(resourceTiles: Array<Cell>, freeTiles: Array<Cell>, gameMap: GameMap, player: Player): string;
    nomadAgent(resourceTiles: Array<Cell>, freeTiles: Array<Cell>, gameMap: GameMap): string;
    sedentarianAgent(resourceTiles: Array<Cell>, freeTiles: Array<Cell>, gameMap: GameMap, player: Player): string;
    getClosestCell(arr: Array<Cell> | any): Cell;
    moveToCell(cell: Cell): string;
    moveToDir(dir: string): string;
}
