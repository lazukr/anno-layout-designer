import { GRID, SelectMode } from "../utils/Constants";
import "../styles/App.scss";
import { Editor } from "./NewEditor";
import { MainMenu } from "./MainMenu";
import { useState } from "react";

export const App = () => {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [selection, setSelection] = useState("cursor");
    const [selectMode, setSelectMode] = useState(SelectMode.ADD);

    const setDimension = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
    };

    const updateSelection = (selection: string) => {
        setSelection(selection);
    }

    const updateSelectMode = (selectMode: SelectMode) => {
        setSelectMode(selectMode);
    }

    return (
        <div className="App">
            {/*}
            <MainMenu
                currentWidth={width}
                currentHeight={height}
                setDimension={setDimension}
                selection={selection}
                updateSelection={updateSelection}
                setSelectMode={updateSelectMode}
                selectMode={selectMode}
    />*/}
            <Editor
                width={width}
                height={height}
                gridSize={32}
                action={""}
                selection={""}
            />
        </div>
    )
};
