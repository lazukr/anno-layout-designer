
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Github, EraserFill, HandIndexFill } from "react-bootstrap-icons";
import { getBuildingSelections, getCitizenSelections, getGame } from "../data/Series";
import { useState } from "react";

interface MenuProps {
};

export const MainMenu = ({
}: MenuProps) => {
    const [game, setGame] = useState("1800");
    const gameData = getGame(game);
    const [citizen, setCitizen] = useState(Object.values(gameData.citizens)[0].name);
    const [building, setBuilding] = useState(Object.values(gameData.citizens[citizen].buildings)[0].name);
    const citizenResult = getCitizenSelections({
        citizens: Object.values(gameData.citizens),
        defaultSelectValue: citizen,
        setSelect: (value: string) => setCitizen(value)
    });

    const buildingResult = getBuildingSelections({
        buildings: gameData.citizens[citizen].buildings,
        defaultSelectValue: building,
        setSelect: (value: string) => setBuilding(value)
    });

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
                        defaultValue={"select"}
                    >
                        <ToggleButton 
                            id="tbg-radio-1" 
                            value={"select"} 
                            variant="dark"
                            title="Select Tool"
                        >
                        <HandIndexFill color="green"/>
                        </ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={"erase"} variant="dark">
                            <EraserFill color="red"/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {citizenResult}
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
                {buildingResult}
            </Navbar>
        </>
    );
};