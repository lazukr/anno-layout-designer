import "../styles/App.scss";
import { useState } from "react";
import { Editor } from "./Editor";
import { MainMenu } from "./MainMenu";
import { EditPanel } from "./EditPanel";
import { DEFAULT_GRID_DIMENSION } from "../Constants";

export const App = () => {

  const [boardWidth, setBoardWidth] = useState(DEFAULT_GRID_DIMENSION);
  const [boardHeight, setBoardHeight] = useState(DEFAULT_GRID_DIMENSION);

  return (
    <div className="App">
      <MainMenu
        newModalProps={{
          setWidth: setBoardWidth,
          setHeight: setBoardHeight,
        }}
      />
      <Editor 
        width={boardWidth} 
        height={boardHeight}
      />
      <EditPanel/>
    </div>
  )
};
