import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

interface ColourPickerProps {
    colour: string;
    setColour: (colour: string) => void;
};

export const ColourPicker = ({
    colour,
    setColour,
}: ColourPickerProps) => {
    const [display, setDisplay] = useState(false);
    const handleClick = () => {
        setDisplay(!display);
    }

    const handleClose = () => {
        setDisplay(false);
    }

    const updateColour = (colour: ColorResult) => {
        setColour(colour.hex);
    }

    return (
        <div 
            style={{
                padding: "9px",
                background: "#f0f0f0",
                borderRadius: "1px",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                display: "inline-block",
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
            <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "2px",
                background: colour,
            }}></div>
            { 
                display ? 
                <div style={{
                    position: "absolute",
                    zIndex: 2,
                }}>
                    <div 
                        style={{
                            position: "fixed",
                            top: "0px",
                            right: "0px",
                            bottom: "0px",
                            left: "0px",
                        }} 
                        onClick={handleClose}
                    />
                    <SketchPicker 
                        color={colour} 
                        onChange={updateColour} 
                    />
                </div> : null 
            }
        </div>
        
    );
};