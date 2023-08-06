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
    FilePlus,
    PaintBucket,
 } from "react-bootstrap-icons";
 
import { Editor } from "./Editor";
import { Action } from "../editor/action";
import { getBuildingSelections, getCitizenSelections } from "../data/Series";
import { NewLayoutModal } from "./NewLayoutModal";
import { ExportModal } from "./ExportModal";
import { ImportModal } from "./ImportModal";
import { ColourPicker } from "./ColourPicker";

const DEFAULT_GAME = "1800";
const DEFAULT_CITIZEN = "1800_farmer";
const DEFAULT_BUILDING = "1800_dirt_road";
const DEFAULT_BOARD_SIZE = 30;

export const MainMenu = () => {
    const [game, setGame] = useState(DEFAULT_GAME);
    const [citizen, setCitizen] = useState(DEFAULT_CITIZEN);
    const [building, setBuilding] = useState(DEFAULT_BUILDING);
    const [action, setAction] = useState(Action.Create);
    const [width, setWidth] = useState(DEFAULT_BOARD_SIZE);
    const [height, setHeight] = useState(DEFAULT_BOARD_SIZE);
    const [colour, setColour] = useState("#0000ff");

    const setBoardSize = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
    };

    const getCurrentBoardSize = (): [number, number] => {
        return [width, height];
    };

    const [newLayoutModal, setNewLayoutModal] = useState(false);
    const [importModal, setImportModal] = useState(false);
    const [exportModal, setExportModal] = useState(false);

    const showNewLayoutModal = () => setNewLayoutModal(true);
    const closeNewLayoutModal = () => setNewLayoutModal(false);

    const showImportModal = () => setImportModal(true);
    const closeImportModal = () => setImportModal(false);

    const showExportModal = () => setExportModal(true);
    const closeExportModal = () => setExportModal(false);

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
                    <Container>
                        <ToggleButtonGroup 
                            type="radio"
                            name="actions" 
                            size="lg"
                            value={action}
                            onChange={e => setAction(e)}
                        >
                            <ToggleButton 
                                id="tbg-radio-select"
                                title="Select building"
                                value={Action.Select} 
                                variant="dark"
                            >
                                <HandIndexFill color="green"/>
                            </ToggleButton>
                            <ToggleButton 
                                id="tbg-radio-delete"
                                title="Delete building"
                                value={Action.Delete}
                                variant="dark"
                            >
                                <EraserFill color="red"/>
                            </ToggleButton>
                            <ToggleButton 
                                id="tbg-radio-fill"
                                title="Colour building"
                                value={Action.Colour}
                                variant="dark"
                            >
                                <PaintBucket />
                            </ToggleButton>
                            <ColourPicker 
                                colour={colour}
                                setColour={(colour: string) => setColour(colour)}
                            />
                        </ToggleButtonGroup>
                    </Container>
                    <Container>
                    <ButtonGroup>
                        <Button 
                            variant="dark" 
                            size="lg"
                            title="New Layout"
                            onClick={showNewLayoutModal}
                        >
                            <FilePlus />
                        </Button>
                        <Button 
                            variant="dark" 
                            size="lg"
                            title="Import Existing Layout"
                            onClick={showImportModal}
                        >
                            <FileEarmarkArrowUp />
                        </Button>
                        <Button 
                            variant="dark" 
                            size="lg"
                            title="Export Layout"
                            onClick={showExportModal}>
                            <FileEarmarkArrowDown />
                        </Button>
                    </ButtonGroup>
                    </Container>
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
                width={width}
                height={height}
                action={action}
                buildingName={building}
                colour={colour}
            />
            <NewLayoutModal 
                showState={newLayoutModal}
                hide={closeNewLayoutModal}
                save={setBoardSize}
                getCurrent={getCurrentBoardSize}
            />
            <ExportModal
                showState={exportModal}
                hide={closeExportModal}
            />
            <ImportModal
                showState={importModal}
                hide={closeImportModal}
            />
        </>
    );
};
