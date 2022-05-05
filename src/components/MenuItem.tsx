import { Menu, Image } from "semantic-ui-react";
import { GAME_POP_MAP, POP_BUILDING_MAP } from "../data/DataMapper";

interface KeyStringList {
    [key: string]: string[];
};

interface MenuItemProps {
    currentItem: string;
    item: string;
    setItem: (item: string) => void;
};

interface KeyComponentList {
    [key: string]: JSX.Element[]
};
interface ComponentGeneratorFromKeyComponentList {
    (currentItem: string, setItem: (item: string) => void): KeyComponentList
};

const PopBuildingMap: KeyStringList = POP_BUILDING_MAP;
const GamePopMap: KeyStringList = GAME_POP_MAP;

export const MenuItem = ({
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

const DataListComponentGenerator = (source: KeyStringList) => {
    const generator: ComponentGeneratorFromKeyComponentList = (currentItem, setItem) => {
        const keyElementMap: KeyComponentList = {};
        for (const [key, items] of Object.entries(source)) {
            keyElementMap[key] = items.map(item => (
                <MenuItem
                    key={item}
                    currentItem={currentItem}
                    item={item}
                    setItem={setItem}
                />
            ));
        }
        return keyElementMap;
    }
    return generator;
}

export const CitizenMenuGenerator = DataListComponentGenerator(GamePopMap);
export const BuildingMenuGenerator = DataListComponentGenerator(PopBuildingMap);