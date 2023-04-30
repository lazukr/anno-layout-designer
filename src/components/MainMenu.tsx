import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { 
    Github, 
    EraserFill, 
    HandIndexFill, 
    FileEarmarkArrowDown, 
    FileEarmarkArrowUp,
    FiletypePng,
 } from "react-bootstrap-icons";

import { saveAsPNG, saveAsSVG } from "../editor/Serializer";
import { Editor } from "./Editor";
import { Action } from "../editor/Cursor";
import { getBuildingSelections, getCitizenSelections } from "../data/Series";

const DEFAULT_GAME = "1800";
const DEFAULT_CITIZEN = "1800_farmer";
const DEFAULT_BUILDING = "1800_dirt_road";

export const MainMenu = () => {
    const [game, setGame] = useState(DEFAULT_GAME);
    const [citizen, setCitizen] = useState(DEFAULT_CITIZEN);
    const [building, setBuilding] = useState(DEFAULT_BUILDING);
    const [action, setAction] = useState(Action.Create);

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
                        name="actions" 
                        size="lg"
                        value={action}
                        onChange={e => setAction(e)}
                    >
                        <ToggleButton 
                            id="tbg-radio-select" 
                            value={Action.Select} 
                            variant="dark"
                        >
                            <HandIndexFill color="green"/>
                        </ToggleButton>
                        <ToggleButton 
                            id="tbg-radio-delete" 
                            value={Action.Delete} 
                            variant="dark"
                        >
                            <EraserFill color="red"/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ButtonGroup>
                        <Button variant="dark">
                            <FileEarmarkArrowUp />
                        </Button>
                        <Button variant="dark" onClick={saveAsSVG}>
                            <FileEarmarkArrowDown />
                        </Button>
                        <Button variant="dark" onClick={saveAsPNG}>
                            <FiletypePng />
                        </Button>
                    </ButtonGroup>
                    {getCitizenSelections({
                        game: game,
                        currentSelect: citizen,
                        setSelect: (citizen: string) => setCitizen(citizen)
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
            >
                {getBuildingSelections({
                    game: game,
                    citizen: citizen,
                    currentSelect: action === Action.Create ? building : action.toString(),
                    setSelect: (building: string) => {
                        setBuilding(building);
                        setAction(Action.Create);
                    },
                })}
            </Navbar>
            <Editor
                width={30}
                height={30}
                action={action}
                buildingName={building}
            />
        </>
    );
};
