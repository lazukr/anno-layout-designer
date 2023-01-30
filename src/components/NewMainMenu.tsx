
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Github, EraserFill, HandIndexFill } from "react-bootstrap-icons";


interface MenuProps {
    currentWidth: number;
    currentHeight: number;
};

export const MainMenu = ({
    currentWidth,
    currentHeight,
}: MenuProps) => {


    return (
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
                    defaultValue={"select"}>
                    <ToggleButton id="tbg-radio-1" value={"select"} variant="dark">
                    <HandIndexFill color="green"/>
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={"erase"} variant="dark">
                        <EraserFill color="red"/>
                    </ToggleButton>
                </ToggleButtonGroup>
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
    );
};