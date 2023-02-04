export declare class Position {
    x: number;
    y: number;
    constructor(x: number, y: number);
    isAdjacent(pos: Position): boolean;
    equals(pos: Position): boolean;
    translate(direction: string, units: number): Position;
    /** Returns Manhattan distance to pos from this position */
    distanceTo(pos: Position): number;
    /** Returns closest direction to targetPos, or null if staying put is best */
    directionTo(targetPos: Position): string;
}
