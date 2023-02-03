import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { useEffect, useRef } from "react";
import { Board } from "../editor/Board";
import { PositionTracker } from "../editor/PositionTracker";
declare const Snap: typeof SNAPSVG_TYPE;

export interface EditorProps {
    width: number;
    height: number;
    gridSize: number;
    selection: string;
    action: string;
};

export const Editor = ({
    width,
    height,
    gridSize
}: EditorProps) => {
    const snap = useRef<Snap.Paper>();
    const bound = useRef<DOMRect>();
    const position = useRef<PositionTracker>();

    useEffect(() => {
        if (snap.current) {
            snap.current.clear();
            new Board({
                snap: snap.current,
                width: width,
                height: height,
                gridSize: gridSize,
            });
        }
    }, [width, height, gridSize]);

    useEffect(() => {
        if (snap.current && bound.current) {
            position.current = new PositionTracker({
                snap: snap.current!,
                bound: bound.current!,
                gridSize: gridSize,
            });
        }
    }, [gridSize]);

    return (
        <svg
            ref={elem => {
                snap.current = Snap(elem!);
                bound.current = snap.current.node.getBoundingClientRect();
            }}
            width={width * gridSize}
            height={height * gridSize}
        >
        </svg>
    );
};