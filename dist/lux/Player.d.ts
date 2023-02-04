import { City } from "./City";
import { Unit } from "./Unit";
/**
 * holds all data related to a player
 */
export declare class Player {
    readonly team: number;
    researchPoints: number;
    units: Unit[];
    cities: Map<string, City>;
    cityTileCount: number;
    constructor(teamid: number);
    researchedCoal(): boolean;
    researchedUranium(): boolean;
}
