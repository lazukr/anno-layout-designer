import _gameList from "./game.json";
import _gamePopMap from "./gamePopMap.json";
import _popBuildingMap from "./popBuildingMap.json";
import _buildings from "./buildings.json";

interface KeyStringList {
    [key: string]: string[];
};

interface BuildingData {
    id: string;
    width: number;
    height: number;
}

export const GAME_LIST = _gameList;
export const GAME_POP_MAP: KeyStringList = _gamePopMap;
export const POP_BUILDING_MAP: KeyStringList = _popBuildingMap;
export const BUILDINGS: {[key: string]: BuildingData} = _buildings;
export const BUILDING_NAMES = Object.keys(BUILDINGS);