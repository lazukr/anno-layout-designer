import data from "./data.json";
import { SeriesData } from "./SeriesData";
import { GameData } from "./GameData";
import { Selection } from "../components/Selection";
import { ImageNameData } from "./ImageNameData";
import { CitizenData } from "./CitizenData";
import { BuildingData } from "./BuildingData";

const series = data as SeriesData;

export const getGame = (game: string): GameData => {
    return series[game];
}

interface CitizenSelectProps {
    citizens: CitizenData[];
    defaultSelectValue: string;
    setSelect: (value: string) => void;
}

export const getCitizenSelections = ({
    citizens,
    defaultSelectValue,
    setSelect,
}: CitizenSelectProps): JSX.Element => {
    const imageDataList = citizens.map(citizen => {
        return <ImageNameData>citizen;
    });

    return Selection({
        name: "citizens",
        defaultValue: defaultSelectValue,
        items: imageDataList,
        setSelect: setSelect,
    });
}

interface BuildingSelectProps {
    buildings: BuildingData[];
    defaultSelectValue: string;
    setSelect: (value: string) => void;
}

export const getBuildingSelections = ({
    buildings,
    defaultSelectValue,
    setSelect,
}: BuildingSelectProps): JSX.Element => {
    const imageDataList = buildings.map(building => {
        return <ImageNameData>building;
    });

    return Selection({
        name: "buildings",
        defaultValue: defaultSelectValue,
        items: imageDataList,
        setSelect: setSelect
    });
}