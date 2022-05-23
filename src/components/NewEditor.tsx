import "fomantic-ui-css/semantic.css";
import "../styles/editor.scss";
import { useEffect, useRef } from "react";
import { GRID, SelectMode } from "../utils/Constants";
import { DataBoard } from "../editor/DataBoard";
import { CursorObject } from "../editor/CursorObject";
import { DisplayBoard } from "../editor/DisplayBoard";
import Snap from "snapsvg-cjs-ts";

interface EditorProps {
    width: number,
    height: number,
    canvas: string,
    selection: string,
    selectMode: SelectMode,
};

export const NewEditor = ({
    width,
    height,
    canvas,
    selection,
    selectMode,
}: EditorProps) => {

    const dataBoard = useRef<DataBoard>();
    const cursorObject = useRef<CursorObject>();
    const displayBoard = useRef<DisplayBoard>();

    useEffect(() => {
        const paperId = `#${canvas}`;
        const snap = Snap(paperId);
        snap.clear();
        const svgElement = document.querySelector(paperId) as SVGGraphicsElement;

        displayBoard.current = new DisplayBoard({
            snap: snap,
            graphicsElement: svgElement,
            gridWidth: width,
            gridHeight: height,
            gridSize: GRID.SIZE,
        });

        dataBoard.current = new DataBoard({
            width: width,
            height: height,
        });

        cursorObject.current = new CursorObject({
            displayBoard: displayBoard.current!,
            dataBoard: dataBoard.current!,
        });

    }, [width, height, canvas]);

    useEffect(() => {
        cursorObject.current?.setSelectObject(selection);
    }, [selection]);

    return (
        <svg
            id={canvas}
            width={width * GRID.SIZE}
            height={height * GRID.SIZE}
        />
    )
};