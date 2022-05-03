import "fomantic-ui-css/semantic.css";
import "../styles/editor.scss";
import { Board } from "../editor/Board";
import { Cursor } from "../editor/Cursor";
import { useEffect, useRef } from "react";
import { GRID } from "../utils/Constants";

export interface EditorProps {
    width: number,
    height: number,
    canvas: string,
    selection: string
};

export const Editor = ({
    width,
    height,
    canvas,
    selection,
}: EditorProps) => {

    const board = useRef<Board>();
    const cursor = useRef<Cursor>();

    useEffect(() => {
        board.current = new Board({
            width: width,
            height: height,
            canvas: canvas,
        });

        cursor.current = new Cursor({
            board: board.current,
            selection: "cursor",
        });
    }, [width, height, canvas]);

    useEffect(() => {
        cursor.current?.setSelection(selection);
    }, [selection]);

    return (
        <svg
            id={canvas}
            width={width * GRID.SIZE}
            height={height * GRID.SIZE}
        />
    )
};