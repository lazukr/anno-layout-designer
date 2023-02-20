import data from "./data.json";
import ui_data from "./ui-data.json";
import image_data from "./image_data.json";
import svg_data from "./svg_data.json";
import { Game } from "./GameData";
import { ButtonSelection, Selection } from "../components/Selection";
import { SelectionData } from "./ImageNameData";
import { Building, SVGBuildingData, SvgData } from "./BuildingData";

const UI_DATA = ui_data as Record<string, Game>;
const IMAGE_DATA = image_data as Record<string, string>;
const SVG_DATA = svg_data as SvgData[];

interface CitizenSelectProps {
    game: string;
    currentSelect: string;
    setSelect: (value: string) => void;
}

export const getCitizenSelections = ({
    game,
    currentSelect,
    setSelect,
}: CitizenSelectProps): JSX.Element => {
    const citizenList = Object.values(UI_DATA[game].citizens).map(citizen => {
        return <SelectionData>{
            id: citizen.id,
            name: citizen.name,
            imagePath: IMAGE_DATA[citizen.id],
        };
    });
    return Selection({
        name: "citizens",
        defaultValue: currentSelect,
        items: citizenList,
        setSelect: setSelect,
    });
}

interface BuildingSelectProps {
    game: string;
    citizen: string;
    currentSelect: string;
    setSelect: (value: string) => void;
}

const constructBuilding = (list: Building[]): SelectionData[] => {
    return list.map(building => {
        return <SelectionData>{
            id: building.id,
            name: building.name,
            imagePath: IMAGE_DATA[building.id],
            children: building.productionChain ? constructBuilding(building.productionChain!) : undefined,
        };
    })
}

export const getBuildingSelections = ({
    game,
    citizen,
    currentSelect,
    setSelect,
}: BuildingSelectProps): JSX.Element => {
    const buildingList = constructBuilding(Object.values(UI_DATA[game].citizens[citizen].buildings));
    return ButtonSelection({
        name: "buildings",
        defaultValue: currentSelect,
        items: buildingList,
        setSelect: setSelect
    });
}

export const getAllBuildingData = () => {
    const buildings = Object.values(SVG_DATA).map(building => {
        return <SVGBuildingData>{
            id: building.id,
            width: building.width,
            height: building.height,
            colour: building.colour,
            imagePath: IMAGE_DATA[building.id],
        }
    });
    return buildings;
}