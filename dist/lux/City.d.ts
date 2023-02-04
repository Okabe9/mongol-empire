import { CityTile } from "./CityTile";
export declare class City {
    cityid: string;
    team: number;
    fuel: number;
    citytiles: CityTile[];
    lightUpkeep: number;
    constructor(teamid: number, cityid: string, fuel: number, lightUpkeep: number);
    addCityTile(x: number, y: number, cooldown: number): CityTile;
    getLightUpkeep(): number;
}
