import React, { useEffect } from "react";
import { Segment } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import "../styles/editor.scss";

declare const Snap: typeof SNAPSVG_TYPE;

export interface EditorProps {
    width: number;
    height: number;
};

const lineProps = {
    stroke: 'black',
    strokeWidth: 0.25,
    width: 1,
};

const semiBoldedLineProps = {
    stroke: 'black',
    strokeWidth: 0.5,
    width: 1,
};

const boldedLineProps = {
    stroke: 'black',
    strokeWidth: 1,
    width: 1,
};

const borderLineProps = {
    stroke: 'black',
    strokeWidth: 5,
    width: 1,
}

const GRID_SIZE = 32;

const getLineType = (i: number) => {
    return i % 10 ? 
        i % 5 ? lineProps : semiBoldedLineProps
        : boldedLineProps;
}

export const Editor = (props: EditorProps) => {
    const {
        width,
        height,
    } = props;

    useEffect(() => {
        const editor = Snap('#snap');
        editor.clear();

        console.log(width, height);

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
        const bottomBorder = editor.line(0, realHeight, realWidth, realHeight);
        const leftBorder = editor.line(0, 0, 0, realHeight);
        const rightBorder = editor.line(realWidth, 0, realWidth, realHeight);

        topBorder.attr(borderLineProps);
        bottomBorder.attr(borderLineProps);
        leftBorder.attr(borderLineProps);
        rightBorder.attr(borderLineProps);        
    }, [width, height]);

    return (
        <Segment 
            basic
            style={{overflow:"auto", maxWidth:"90wh", maxHeight:"80vh"}}
        >
            <svg 
                id="snap" 
                width={props.width * GRID_SIZE}
                height={props.height * GRID_SIZE}
            />
        </Segment>
    );
};