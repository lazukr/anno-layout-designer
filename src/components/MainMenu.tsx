
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Github, EraserFill, HandIndexFill } from "react-bootstrap-icons";
import { getBuildingSelections, getCitizenSelections, getGame } from "../data/Series";
import { useEffect, useState } from "react";
import { Editor } from "./Editor";

interface MenuProps {
};

export const MainMenu = ({
}: MenuProps) => {
    const [game, setGame] = useState("1800");
    const [gameData, setGameData] = useState(getGame(game));
    const [citizen, setCitizen] = useState(Object.values(gameData.citizens)[0]);
    const [building, setBuilding] = useState(Object.values(citizen.buildings)[0]);
    const [action, setAction] = useState("create");

    useEffect(() => {
        setGameData(getGame(game));
    }, [game]);
    
    return (
        <>
            <Navbar
                expand="lg"
                bg="dark"
                variant="dark"
            >
                <Container fluid>
                    <Navbar.Brand>Anno 1800 Layout Planner</Navbar.Brand>
                    <Nav className="me-auto">
                    <ToggleButtonGroup 
                        type="radio"
                        name="action" 
                        size="lg" 
                        defaultValue={action}
                        onChange={(value: string) => setAction(value)}
                    >
                        <ToggleButton 
                            id="tbg-radio-1" 
                            value={"select"} 
                            variant="dark"
                            title="Select Tool"
                        >
                            <HandIndexFill color="green"/>
                        </ToggleButton>
                        <ToggleButton 
                            id="tbg-radio-2" 
                            value={"delete"} 
                            variant="dark"
                        >
                            <EraserFill color="red"/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {getCitizenSelections({
                        citizens: Object.values(gameData.citizens),
                        defaultSelectValue: citizen.name,
                        setSelect: (value: string) => setCitizen(gameData.citizens[value])
                    })}
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link 
                            href="https://github.com/lazukr/anno-layout-designer"
                            target="_blank">
                            <Github/>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Navbar
                expand="lg"
                bg="dark"
                variant="dark"
                className="fixed-bottom"
            >
                {getBuildingSelections({
                    buildings: Object.values(citizen.buildings),
                    defaultSelectValue: building.name,
                    setSelect: (value: string) => {
                        setBuilding(citizen.buildings[value]);
                        setAction("create");
                    },
                })}
            </Navbar>
            <Editor
                width={20}
                height={20}
                gridSize={32}
                action={action}
                selection={building}
            />
        </>
    );
};