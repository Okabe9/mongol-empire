import { Player } from "./Player";
import { GameMap } from "./GameMap";
import { Parsed } from "./Parsed";
export interface GameState {
    id: number;
    map: GameMap;
    players: Array<Player>;
    turn: number;
}
/**
 * Agent for sequential `Designs`
 */
export declare class Agent {
    getLine: () => Promise<Parsed>;
    gameState: GameState;
    _setup(): void;
    /**
     * Constructor for a new agent
     * User should edit this according to the `Design` this agent will compete under
     */
    constructor();
    /**
     * Initialize Agent for the `Match`
     * User should edit this according to their `Design`
     */
    initialize(): Promise<void>;
    /**
     * Updates agent's own known state of `Match`
     * User should edit this according to their `Design`.
     */
    update(): Promise<void>;
    resetPlayerStates(): void;
    retrieveUpdates(): Promise<void>;
    /**
     * End a turn
     */
    endTurn(): void;
    run(loop: (gameState: GameState) => Array<string>): Promise<void>;
}
export declare const annotate: {
    circle: (x: number, y: number) => string;
    x: (x: number, y: number) => string;
    line: (x1: number, y1: number, x2: number, y2: number) => string;
    text: (x1: number, y1: number, message: string, fontsize?: number) => string;
    sidetext: (message: string) => string;
};
