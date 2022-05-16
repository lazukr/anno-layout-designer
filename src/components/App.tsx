import { GRID } from "../utils/Constants";
import "../styles/App.scss";
import { Editor } from "./Editor";
import { MainMenu } from "./MainMenu";
import { useState } from "react";

export const App = () => {
    const [width, setWidth] = useState(GRID.DEFAULT_DIMENSION);
    const [height, setHeight] = useState(GRID.DEFAULT_DIMENSION);
    const [selection, setSelection] = useState("cursor");
    

    const setDimension = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
    };

    const updateSelection = (selection: string) => {
        setSelection(selection);
    }

    return (
        <div className="App">
            <MainMenu
                currentWidth={width}
                currentHeight={height}
                setDimension={setDimension}
                selection={selection}
                updateSelection={updateSelection}
            />
            <Editor
                width={width}
                height={height}
                canvas={"svg"}
                selection={selection}
            />
        </div>
    )
};
