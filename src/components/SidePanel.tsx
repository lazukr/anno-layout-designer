import "semantic-ui-css/semantic.min.css";
import "../styles/button.scss";
import "../styles/sidebar.scss";

import React, { ChangeEvent, useState } from "react";

export interface PanelProps {
    width: number;
    height: number;
    newGrid(width: number, height: number): void;
}


export const SidePanel = (props: PanelProps) => {
    const [hidePanel, setHidePanel] = useState(true);
    const [panelToggleText, setPanelToggleText] = useState("⇤");
    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const togglePanel = () => {
        setHidePanel(!hidePanel);
        panelToggleText === "⇤" 
            ? setPanelToggleText("⇥")
            : setPanelToggleText("⇤");

        const sidebar = document.getElementById("sidebar")!;
        sidebar.classList.toggle("minimized");
    };
    
    const newGrid = () => {
        props.newGrid(width, height);
    }

    return (
        <div id="sidebar" className="ui visible left sidebar">
            <div>
                <button 
                className="button sidebar-button"
                onClick={togglePanel}>
                    {panelToggleText}
                </button>
            </div>
            {hidePanel && (
            <div>
                <h2 className="title left-aligned">
                    Anno 1800 <br/>
                    Layout Designer
                </h2>
            <hr className="line" />
            <hr className="line" />
            <h3 className="title">Dimensions</h3>
            <div className="option">
                <span>Width:</span>
                <input 
                className="input"
                id="width"
                type="number"
                max="999"
                min="1"
                defaultValue={width}
                onChange={e => setWidth(parseInt(e.target.value))}
                />
            </div>
            <div className="option">
                <span>Height:</span>
                <input 
                className="input"
                id="height"
                type="number"
                max="999"
                min="1"
                defaultValue={height}
                onChange={e => setHeight(parseInt(e.target.value))}
                />
            </div>
            <button
                className="button"
                onClick={newGrid}>
                New
            </button>
            <hr className="line" />
            <button className="button">
                Load
            </button>
            <button className="button">
                Save
            </button>
            <hr className="line" />
            <button className="button">
                Export
            </button>
            <hr className="line" />
            </div>)}
        </div>
    );
};