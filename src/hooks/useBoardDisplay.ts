import { useEffect } from "react";
import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { Board } from "./useBoard";
import { 
    GRID_SIZE,
    BORDER_LINE,
    NORMAL_LINE,
    SEMI_BOLDED_LINE,
    BOLDED_LINE,
} from "../Constants";

declare const Snap: typeof SNAPSVG_TYPE;

const getLineType = (i: number) => {
    return i % 10 ? 
        i % 5 ? NORMAL_LINE : SEMI_BOLDED_LINE
        : BOLDED_LINE;
};

export const useBoardDisplay = (props: Board) => {
    const {
        width,
        height,
    } = props;

    useEffect(() => {
        const editor = Snap("#snap");
        editor.clear();

        const rowLines = Array.from(Array(height).keys());
        const colLines = Array.from(Array(width).keys());
        const realWidth = width * GRID_SIZE;
        const realHeight = height * GRID_SIZE;

        colLines.forEach(i => {
            const currentPosition = i * GRID_SIZE;
            const line = editor.line(currentPosition, 0, currentPosition, realHeight);
            line.attr(getLineType(i));
        });

        rowLines.forEach(i => {
            const currentPosition = i * GRID_SIZE;
            const line = editor.line(0, currentPosition, realWidth, currentPosition);
            line.attr(getLineType(i));
        });

        const topBorder = editor.line(0, 0, realWidth, 0);
        const leftBorder = editor.line(0, 0, 0, realHeight);
        const bottomBorder = editor.line(0, realHeight, realWidth, realHeight);
        const rightBorder = editor.line(realWidth, 0, realWidth, realHeight);

        topBorder.attr(BORDER_LINE);
        bottomBorder.attr(BORDER_LINE);
        leftBorder.attr(BORDER_LINE);
        rightBorder.attr(BORDER_LINE);        
    }, [width, height]);

    return {
        boardWidth: width * GRID_SIZE,
        boardHeight: height * GRID_SIZE,
    };
};