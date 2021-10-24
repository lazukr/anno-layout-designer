import { useEffect, useState } from "react";
import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { GRID_SIZE } from "../Constants";
import { Dimension, Position } from "../Board";
import { usePlacementHighlight } from "./useBoardHighlight";

declare const Snap: typeof SNAPSVG_TYPE;

export interface CellCursor {
    name: string;
    dimension: Dimension;
};

export interface CursorInfo {
    name: string;
    position: Position;
    dimension: Dimension
}

// need names and size
export const useBoardCursor = () => {
    const [position, setPosition] = useState<Position>(Position.Origin);

    useEffect(() => {
        const editor = Snap("#snap");
        const elem = document.querySelector("#snap");
        
        const setFromEvent = (e: MouseEvent) => {
            const bound = elem!.getBoundingClientRect();
            setPosition({
                x: Math.floor((e.pageX - bound.left) / GRID_SIZE),
                y: Math.floor((e.pageY - bound.top) / GRID_SIZE),
            });
        }
        
        editor.mousemove(setFromEvent);
        return () => {
            editor.unmousemove();
        };
    }, []);
    
    return position;
};