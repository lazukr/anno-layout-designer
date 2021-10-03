import React, { useEffect } from "react";
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

export const Editor = (props: EditorProps) => {
    const {
        width,
        height,
    } = props;

    useEffect(() => {
        const editor = Snap('#snap');
        editor.clear();

        const rowLines = Array.from(Array(width + 1).keys());
        const colLines = Array.from(Array(height + 1).keys());
        const realWidth = width * GRID_SIZE;
        const realHeight = height * GRID_SIZE;

        colLines.forEach(i => {
            const currentPosition = i * GRID_SIZE;
            const line = editor.line(currentPosition, 0, currentPosition, realHeight);
            line.attr(i % 10 ? lineProps : boldedLineProps);
        });

        rowLines.forEach(i => {
            const currentPosition = i * GRID_SIZE;
            const line = editor.line(0, currentPosition, realWidth, currentPosition);
            line.attr(i % 10 ? lineProps : boldedLineProps);
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
        <div className="ui basic segment"
            style={{overflow:"auto", maxWidth:"90wh", maxHeight:"80vh"}}>
            <svg 
                id="snap" 
                width={props.width * GRID_SIZE}
                height={props.height * GRID_SIZE}
            />
        </div>
    );
};