import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { useEffect, useRef } from "react";
import { Board } from "../editor/Board";
import { PositionTracker } from "../editor/PositionTracker";
import { Action, Cursor } from "../editor/Cursor";
import "../styles/editor.scss";
import { createAllBuildings } from "../editor/Building";

declare const Snap: typeof SNAPSVG_TYPE;

export interface EditorProps {
    width: number;
    height: number;
    gridSize: number;
    buildingName: string;
    action: Action;
};

export const Editor = ({
    width,
    height,
    gridSize,
    buildingName,
    action,
}: EditorProps) => {
    const snap = useRef<Snap.Paper>();
    const position = useRef<PositionTracker>();
    const cursor = useRef<Cursor>();
    const actionRef = useRef<Action>(Action.Create);

    const getHightlight = () => {
        switch (actionRef.current) {
            case Action.Delete:
                return "delete";
            case Action.Select:
                return "select";
            default:
                return "select";
        }
    }

    useEffect(() => {
        actionRef.current = action;
    }, [action]);

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
        if (snap.current) {
            position.current = new PositionTracker({
                snap: snap.current!,
                gridSize: gridSize,
            });
        }
    }, [gridSize]);
    
    useEffect(() => {
        if (snap.current && position.current) {
            cursor.current?.destroy();
            cursor.current = new Cursor({
                snap: snap.current,
                position: position.current,
                action: action,
                buildingName: buildingName,
                gridSize: gridSize,
                getHighlight: getHightlight,
            });
        }
    }, [gridSize, action, buildingName]);
    

    return (
        <svg
            id="svg"
            ref={elem => {
                if (!snap.current) {
                    snap.current = Snap(elem!);
                } 
            }}
            width={width * gridSize}
            height={height * gridSize}
        >
        </svg>
    );
};