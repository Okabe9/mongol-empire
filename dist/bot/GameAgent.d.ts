import { Cell } from '../lux/Cell';
import { Unit } from '../lux/Unit';
import { AgentRole } from './AgentRole';
import { GameMap } from '../lux/GameMap';
export declare class GameAgent {
    gameAgent: Unit;
    id: string;
    canGather: boolean;
    role: AgentRole;
    constructor(ag: Unit);
    agentRoutine(): void;
    basicAction(resourceTiles: Array<Cell>, freeTiles: Array<Cell>, gameMap: GameMap): string;
    getClosestCell(arr: Array<Cell> | any): Cell;
    moveToCell(cell: any): string;
}
