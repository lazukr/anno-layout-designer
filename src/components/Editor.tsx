import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { useEffect, useRef } from "react";
import { Board, createAllBuildings } from "../editor/Board";
import { PositionTracker } from "../editor/PositionTracker";
import { Action, Cursor } from "../editor/Cursor";
import { BuildingData } from "../data/BuildingData";
import "../styles/editor.scss";

declare const Snap: typeof SNAPSVG_TYPE;

export interface EditorProps {
    width: number;
    height: number;
    gridSize: number;
    selection: BuildingData;
    action: Action;
};

export const Editor = ({
    width,
    height,
    gridSize,
    selection,
    action,
}: EditorProps) => {
    const snap = useRef<Snap.Paper>();
    const bound = useRef<DOMRect>();
    const position = useRef<PositionTracker>();
    const cursor = useRef<Cursor>();

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
        if (snap.current) {
            createAllBuildings(snap.current, gridSize);
        }
    }, [gridSize]);

    useEffect(() => {
        if (snap.current && bound.current) {
            position.current = new PositionTracker({
                snap: snap.current!,
                bound: bound.current!,
                gridSize: gridSize,
            });
        }
    }, [gridSize]);

    useEffect(() => {
        if (snap.current && position.current) {
            cursor.current?.destroy();
            cursor.current = new Cursor({
                snap: snap.current,
                action: action,
                position: position.current,
                buildingData: selection,
                gridSize: gridSize,
            });
        }
    }, [gridSize, selection, action]);

    return (
        <svg
            id="svg"
            ref={elem => {
                if (!snap.current) {
                    snap.current = Snap(elem!);
                    bound.current = snap.current.node.getBoundingClientRect();
                } 
            }}
            width={width * gridSize}
            height={height * gridSize}
        >
        </svg>
    );
};

/*

    */