import "../styles/App.scss";
import { useState } from "react";
import { Editor } from "./Editor";
import { MainMenu } from "./MainMenu";
import { EditPanel } from "./EditPanel";

export const App = () => {

  const [boardWidth, setBoardWidth] = useState(10);
  const [boardHeight, setBoardHeight] = useState(10);

  return (
    <div className="App">
      <MainMenu
        newLayoutModalProps={{
          setBoardWidth,
          setBoardHeight,
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
