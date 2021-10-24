import { useEffect, useState } from "react";
import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { GRID_SIZE } from "../Constants";
import { CellCursor, CursorInfo } from "./useBoardCursor";
import { Dimension, Position } from "../Board";

declare const Snap: typeof SNAPSVG_TYPE;

export const usePlacementHighlight = (cell: Position, dimension: Dimension) => {
    const {x, y } = cell;
    const {width, height} = dimension;

    useEffect(() => {
        const editor = Snap("#snap");
        const highlight = editor.rect(
            x * GRID_SIZE, 
            y * GRID_SIZE, 
            width * GRID_SIZE, 
            height * GRID_SIZE,
        );

        highlight.attr({
            fill: "red",
            opacity: 0.3,
        });

        return () => {
            highlight.remove();
        }
    }, [x, y, width, height]);
}