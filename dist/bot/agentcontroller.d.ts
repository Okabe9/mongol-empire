import { GameState } from '../lux/Agent';
import { Cell } from '../lux/Cell';
import { Player } from '../lux/Player';
import { GameMap } from '../lux/GameMap';
import { GameAgent } from './GameAgent';
import { AgentRole } from './AgentRole';
export declare class AgentController {
    stage: number;
    actions: Array<string>;
    gameState: GameState;
    player: Player;
    opponent: Player;
    gameMap: GameMap;
    resourceTiles: Array<Cell>;
    freeTiles: Array<Cell>;
    agents: Array<GameAgent>;
    update(gameState: GameState): any;
    stateMachine(): void;
    setAgents(): void;
    nextRole(): AgentRole;
    computeAgents(): void;
    computeTiles(): void;
}
