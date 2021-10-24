import { useEffect } from "react";
import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { GRID_SIZE } from "../Constants";
import { Position } from "../Board";
import { Building } from "../components/EditPanel";

declare const Snap: typeof SNAPSVG_TYPE;

export const usePlacementHighlight = (cell: Position, selection: Building) => {
    useEffect(() => {
        const {x, y} = cell;
        const {
            image,
            level,
            colour,
            dimension,
        } = selection;
        const { width, height } = dimension;

        const editor = Snap("#snap");
        const highlight = editor.rect(
            x * GRID_SIZE, 
            y * GRID_SIZE, 
            width * GRID_SIZE, 
            height * GRID_SIZE,
        );

        highlight.attr({
            fill: colour,
            opacity: 0.3,
        });

        const squareSize = Math.min(width, height) / 2;
        const centerX = x + width / 2 - squareSize / 2;
        const centerY = y + height / 2 - squareSize / 2;

        const display = editor.image(
            `${process.env.PUBLIC_URL}/assets/images/${level}/${image}`,
            centerX * GRID_SIZE,
            centerY * GRID_SIZE,
            squareSize * GRID_SIZE,
            squareSize * GRID_SIZE,
        );

        display.attr({
            opacity: 0.6,
        });
    
        return () => {
            highlight.remove();
            display.remove();
        }
    }, [cell, selection]);
}