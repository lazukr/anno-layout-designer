import "../styles/App.scss";
import { useState } from "react";
import { Editor } from "./Editor";
import { MainMenu } from "./MainMenu";
import { Building, EditPanel } from "./EditPanel";
import { DEFAULT_GRID_DIMENSION } from "../Constants";
import { Dimension } from "../Board";

export const App = () => {

	const [boardDimension, setBoardDimension] = useState<Dimension>({
		width: DEFAULT_GRID_DIMENSION,
		height: DEFAULT_GRID_DIMENSION,
	});

	const [selectedBuilding, setSelectedBuilding] = useState<Building>({
		name: "",
		image: "",
		colour: "FFFFFF",
		level: "",
		dimension: Dimension.Zero,

  });

	const setSelection = (selected: Building) => {
		setSelectedBuilding(selected);
	}

	const setDimension = (dimension: Dimension) => {
		setBoardDimension(dimension);
	}

	return (
		<div className="App">
		<MainMenu
			setDimension={setDimension}
		/>
		<Editor
			board={boardDimension}
			selection={selectedBuilding}
		/>
		<EditPanel
			setSelectedBuilding={setSelection}
		/>
		</div>
	)
};
