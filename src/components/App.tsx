import { Editor } from "./Editor";
import { MainMenu } from "./MainMenu";
import { useState } from "react";

export const App = () => {
    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(20);
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
            <MainMenu />
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
