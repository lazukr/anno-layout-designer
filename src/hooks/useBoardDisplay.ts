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

const MAJOR_LINE_GRID = 10;
const MINOR_LINE_GRID = 5;

const getLineType = (i: number) => {
    
    // every 10 lines is a major line grid
    if (i % MAJOR_LINE_GRID === 0) {
        return BOLDED_LINE;
    }

    // every 5 lines is a minor line grid
    if (i % MINOR_LINE_GRID === 0) {
        return SEMI_BOLDED_LINE;
    }

    // every other line should be normal
    return NORMAL_LINE;
};

type LinePoints = [number, number, number, number];

const getBordersPoints = (width: number, height: number): LinePoints[] => {
    return [
        [0, 0, width, 0], // top
        [0, 0, 0, height], // left
        [0, height, width, height], // bottom
        [width, 0, width, height], // right
    ];
};

const getCurrentColPoints = (offset: number, length: number): LinePoints => {
    return [offset, 0, offset, length];
};

const getCurrentRowPoints = (offset: number, length: number): LinePoints => {
    return [0, offset, length, offset];
};

const getZeroToNList = (n: number) => {
    return Array.from(Array(n).keys());
};

export const useBoardDisplay = (props: Board) => {
    const {
        width,
        height,
    } = props;

    useEffect(() => {
        const editor = Snap("#snap");
        editor.clear();

        const createLines = (
            dimensions: number, 
            orientationLength: number, 
            orientationFunction: (offset: number, length: number) => LinePoints
            ) => {

            getZeroToNList(dimensions)
                .map(i => orientationFunction(i * GRID_SIZE, orientationLength))
                .map(linepoints => editor.line(...linepoints))
                .map((line, i) => line.attr(getLineType(i)));
        };

        const createBorderLines = (width: number, height: number) => {
            getBordersPoints(width, height)
                .map(linepoints => editor.line(...linepoints))
                .map(line => line.attr(BORDER_LINE));
        };

        const realWidth = width * GRID_SIZE;
        const realHeight = height * GRID_SIZE;

        createLines(width, realHeight, getCurrentColPoints);
        createLines(height, realWidth, getCurrentRowPoints);
        createBorderLines(realWidth, realHeight);

    }, [width, height]);

    return {
        boardWidth: width * GRID_SIZE,
        boardHeight: height * GRID_SIZE,
    };
};