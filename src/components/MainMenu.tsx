import { useState } from "react";
import { Menu, Button, Dropdown } from "semantic-ui-react";
import { NewModal } from "./NewModal";
import { GAME_LIST } from "../data/DataMapper";
import { DEFAULT_GAME, DEFAULT_POP, SelectMode } from "../utils/Constants";
import { CitizenMenuGenerator, BuildingMenuGenerator } from "./MenuItem";
interface MenuProps {
    currentWidth: number;
    currentHeight: number;
    setDimension: (width: number, height: number) => void;
    selection: string;
    updateSelection: (selection: string) => void;
    setSelectMode: (selectMode: SelectMode) => void;
    selectMode: SelectMode;
};

export const MainMenu = ({
    currentWidth,
    currentHeight,
    setDimension,
    selection,
    updateSelection,
    setSelectMode,
    selectMode,
}: MenuProps) => {
    const [game, setGame] = useState(DEFAULT_GAME);
    const [citizen, setCitizen] = useState(DEFAULT_POP[game]);

    const updateGame = (game: string) => {
        setGame(game);
        setCitizen(DEFAULT_POP[game]);
    };

    return (
        <>
            <Menu
                inverted
                attached
                size="huge">
                <Menu.Item header>
                    Anno Layout Designer
                </Menu.Item>
                <Dropdown
                    item
                    placeholder="Game"
                    compact
                    closeOnEscape
                    selection
                    options={GAME_LIST}
                    defaultValue={game}
                    onChange={(_, {value}) => updateGame(value as string)}
                >
                </Dropdown>
                <Button.Group compact>
                    <NewModal
                        currentWidth={currentWidth}
                        currentHeight={currentHeight}
                        setDimension={setDimension}
                    />
                </Button.Group>
                <Button.Group
                    icon
                    size="big">
                    <Button 
                        icon="mouse pointer"
                        active={selectMode === SelectMode.SELECT}
                        onClick={() => setSelectMode(SelectMode.SELECT)}
                    />
                    <Button  
                        icon="pencil"
                        active={selectMode === SelectMode.ADD}
                        onClick={() => setSelectMode(SelectMode.ADD)}
                    />
                    <Button 
                        icon="eraser"
                        active={selectMode === SelectMode.ERASE}
                        onClick={() => setSelectMode(SelectMode.ERASE)}
                    />
                </Button.Group>
                {CitizenMenuGenerator(citizen, setCitizen)[game]}
                <Menu.Menu position="right">
                    <Menu.Item
                        icon="github"
                        name="Github"
                        href="https://github.com/lazukr/anno-layout-designer"
                        target="_blank"
                        rel="noreferrer">
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Menu
            attached
            inverted
            >
                {BuildingMenuGenerator(selection, updateSelection)[citizen]}
            </Menu>
        </>
    );
};
