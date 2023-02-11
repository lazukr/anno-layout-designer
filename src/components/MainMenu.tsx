import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { Editor } from "./Editor";
import { Action } from "../editor/Cursor";
import { getBuildingSelections, getCitizenSelections, getGame } from "../data/Series";

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

declare const Snap: typeof SNAPSVG_TYPE;

const DEFAULT_GAME = "1800";

export const MainMenu = () => {
    const [game, setGame] = useState(DEFAULT_GAME);
    const [gameData, setGameData] = useState(getGame(game));
    const [citizen, setCitizen] = useState(Object.values(gameData.citizens)[0]);
    const [building, setBuilding] = useState(Object.values(citizen.buildings)[0]);
    const [action, setAction] = useState(Action.Create);

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
            >
                {getBuildingSelections({
                    buildings: Object.values(citizen.buildings),
                    defaultSelectValue: action === Action.Create ? building.name : action.toString(),
                    setSelect: (value: string) => {
                        setBuilding(citizen.buildings[value]);
                        setAction(Action.Create);
                    },
                })}
            </Navbar>
            <Editor
                width={30}
                height={30}
                gridSize={32}
                action={action}
                buildingName={building.name}
            />
        </>
    );
};

const save = (name: string, blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
}

const saveAsSVG = async () => {
    const result = Snap("#svg");
    const data = result.toDataURL();
    const blob = await (await fetch(data)).blob();
    save("anno-layout.svg", blob);
}

const downloadFromCanvas = (canvas: HTMLCanvasElement) => {
    canvas.toBlob(blob => {
        save("anno-layout.png", blob!);
    });
}

const saveAsPNG = () => {
    // snap svg doesn't include the xml namespace in the image tags
    // xmlns:ns1="http://www.w3.org/1999/xlink"
    // thus it doesn't work properly when trying to use the data url
    // thus I grabbed it directly from the dom and used xml serializer
    const svg = document.getElementById("svg");
    // make a copy
    const svgCopy = svg!.cloneNode(true) as HTMLElement;
    const rectdefs = svgCopy.querySelectorAll("rect");
    const uses = svgCopy.querySelectorAll("use");

    // create the border of each element
    rectdefs.forEach(rect => {
        rect.style.stroke = "#000";
        rect.style.strokeWidth = "1";
    });

    // remove the current cursor
    uses.forEach(use => {
        if (!use.attributes.getNamedItem("placed")) {
            use.remove();
        }
    });

    const data = new XMLSerializer().serializeToString(svgCopy as Node);
    const image = new Image();
    image.onload = () => {
        const {
            width,
            height,
        } = svg!.getBoundingClientRect();

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context!.drawImage(image, 0, 0);
        downloadFromCanvas(canvas);
    }
    image.src = `data:image/svg+xml,${encodeURIComponent(data)}`;
}