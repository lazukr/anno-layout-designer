import "../styles/App.scss";
import { useState } from "react";
import { Editor } from "./Editor";
import { SidePanel } from "./SidePanel";
import { Menu } from "./Menu";

export const App = () => {

  const [boardWidth, setBoardWidth] = useState(150);
  const [boardHeight, setBoardHeight] = useState(150);

  const newGrid = (width: number, height: number): void => {
    setBoardWidth(width);
    setBoardHeight(height);
  }

  return (
    <div className="App">
      <Menu/>
      <Editor 
        width={boardWidth} 
        height={boardHeight}
      />
      {/*
      <div>
        <SidePanel width={boardWidth} height={boardHeight} newGrid={newGrid} />
        <Editor width={boardWidth} height={boardHeight}/>
      </div>
      */}
    </div>
  )
};
