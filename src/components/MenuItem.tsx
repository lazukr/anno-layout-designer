import { Menu, Image } from "semantic-ui-react";
import _gamePopMap from "../data/gamePopMap.json";
import _popBuildingMap from "../data/popBuildingMap.json";

interface PopBuildingMapProps {
    [key: string]: string[];
};

interface GamePopMapProps {
    [key: string]: string[];
}

const PopBuildingMap: PopBuildingMapProps = _popBuildingMap;
const GamePopMap: GamePopMapProps = _gamePopMap;

interface MenuItemProps {
    currentItem: string;
    item: string;
    setItem: (item: string) => void;
};

const MenuItem = ({
    currentItem,
    item,
    setItem,
}: MenuItemProps) => {
    return (
        <Menu.Item
            key={item}
            fitted="vertically"
            active={item === currentItem}
            onClick={_ => setItem(item)}    
        >
            <Image
                key={item}
                rounded
                size="mini"
                src={`${process.env.PUBLIC_URL}/assets/images/${item}.png`}
            />
        </Menu.Item>
    );
}

export const CitizenMenuGenerator = (game: string, currentPop: string, setCitizen: (citizen: string) => void) => {
    const generator: {[key: string]: JSX.Element[]} = {};
    for (const [key, pops] of Object.entries(GamePopMap)) {
        generator[key] = pops.map(pop => (
            <MenuItem
                key={pop}
                currentItem={currentPop}
                item={pop}
                setItem={setCitizen}
            />
        ));
    }
    return generator;
};

export const BuildingMenuGenerator = (game: string, currentBuilding: string, setBuilding: (building: string) => void) => {
    const generator: {[key: string]: JSX.Element[]} = {};
    for (const [key, buildings] of Object.entries(PopBuildingMap)) {
        generator[key] = buildings.map(building => (
            <MenuItem
                key={building}
                currentItem={currentBuilding}
                item={building}
                setItem={setBuilding}
            />
        ));
    }
    return generator;
};