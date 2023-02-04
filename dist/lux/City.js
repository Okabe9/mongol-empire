"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
// all data related to a city
var CityTile_1 = require("./CityTile");
var City = /** @class */ (function () {
    function City(teamid, cityid, fuel, lightUpkeep) {
        this.citytiles = new Array();
        this.cityid = cityid;
        this.team = teamid;
        this.fuel = fuel;
        this.lightUpkeep = lightUpkeep;
    }
    City.prototype.addCityTile = function (x, y, cooldown) {
        var ct = new CityTile_1.CityTile(this.team, this.cityid, x, y, cooldown);
        this.citytiles.push(ct);
        return ct;
    };
    City.prototype.getLightUpkeep = function () {
        return this.lightUpkeep;
    };
    return City;
}());
exports.City = City;
//# sourceMappingURL=City.js.map