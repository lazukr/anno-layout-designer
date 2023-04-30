import { useEffect, useRef, useState } from "react";
import { Action } from "../editor/Cursor";
import { SnapCanvas } from "../editor/SnapCanvas";
import "../styles/editor.scss";

export interface EditorProps {
    width: number;
    height: number;
    buildingName: string;
    action: Action;
};

export const Editor = ({
    width,
    height,
    buildingName,
    action,
}: EditorProps) => {
    const [canvas, setCanvas] = useState<SnapCanvas>();
    const actionRef = useRef<Action>(Action.Create);

    const getHightlighter = () => {
        switch (actionRef.current) {
            case Action.Delete:
                return "delete";
            case Action.Select:
            default:
                return "select";
        }
    }

    useEffect(() => {
        setCanvas(new SnapCanvas({
            id: "#svg",
            width: 30,
            height: 30,
            highlighter: getHightlighter,
        }));
    }, [width, height]);

    useEffect(() => {
        actionRef.current = action;
    }, [action]);

    useEffect(() => {
        canvas?.setCursor(action, buildingName);
    }, [canvas, action, buildingName]);

    return (
        <svg id="svg"></svg>
    );
};