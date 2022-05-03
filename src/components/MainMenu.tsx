import { useState } from "react";
import { Menu, Icon, Button, Dropdown, Image, Tab } from "semantic-ui-react";
import { NewModal } from "./NewModal";
import GameList from "../data/game.json";
import _gamePopMap from "../data/gamePopMap.json";
import { DEFAULT_GAME, DEFAULT_POP } from "../utils/Constants";
import { CitizenMenuGenerator, BuildingMenuGenerator } from "./MenuItem";
export interface MenuProps {
    currentWidth: number;
    currentHeight: number;
    setDimension: (width: number, height: number) => void;
    selection: string;
    updateSelection: (selection: string) => void;
};

export const MainMenu = ({
    currentWidth,
    currentHeight,
    setDimension,
    selection,
    updateSelection,
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
                    options={GameList}
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
                    <Button positive>
                        <Icon name="pencil"></Icon>
                    </Button>
                    <Button negative>
                        <Icon name="eraser"></Icon>
                    </Button>
                </Button.Group>
                {CitizenMenuGenerator(game, citizen, setCitizen)[game]}
                <Menu.Menu position="right">
                    <Menu.Item
                        icon="github"
                        name="Github"
                        href="https://github.com/lazukr"
                        target="_blank"
                        rel="noreferrer">
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Menu
            attached
            inverted
            >
                {BuildingMenuGenerator(game, selection, updateSelection)[citizen]}
            </Menu>
        </>
    );
};
