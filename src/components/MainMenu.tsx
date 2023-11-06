import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
	Github,
	EraserFill,
	HandIndexFill,
	FileEarmarkArrowDown,
	FileEarmarkArrowUp,
	FilePlus,
	PaintBucket,
	InfoCircle,
} from "react-bootstrap-icons";

import { CitizenSelect } from "./CitizenSelect";
import { BuildingSelect } from "./BuildingSelect";
import { Board } from "./Board";
import { ActionBar } from "./ActionBar";

export const MainMenu = () => {
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
						<ActionBar />
						<CitizenSelect />
					</Nav>
					<Nav className="justify-content-end">
						<Nav.Link
							href="https://github.com/lazukr/anno-layout-designer"
							target="_blank"
						>
							<Github size={32} />
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<Navbar
				expand="lg"
				bg="dark"
				variant="dark"
			>
				<BuildingSelect />
			</Navbar>
			<Board />
		</>
	);
};
