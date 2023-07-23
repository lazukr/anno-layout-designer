import { useEffect, useRef } from "react";
import { Action } from "../editor/action";
import { SvgCanvas } from "../editor/SvgCanvas";
import "../styles/editor.scss";
import { Brush } from "../editor/Brush";
import { CreateBrush } from "../editor/CreateBrush";
import { DeleteBrush } from "../editor/DeleteBrush";
import { SelectBrush } from "../editor/SelectBrush";

const GRID_SIZE = 32;
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
    const svgRef = useRef<SVGSVGElement>(null);
    const brushRef = useRef<Brush | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            SvgCanvas.setSvg(svgRef.current);
            SvgCanvas.setGridSize(GRID_SIZE);
            SvgCanvas.setCursor();
        }
    }, []);

    useEffect(() => {
        SvgCanvas.setBoard(width, height);
    }, [width, height]);

    useEffect(() => {
        const svg = SvgCanvas.GetSVG();
        const cursor = SvgCanvas.GetCursor();
        brushRef.current?.remove();
        switch (action) {
            case Action.Create:
                brushRef.current = new CreateBrush(svg, cursor, buildingName);
                break;
            case Action.Delete:
                brushRef.current = new DeleteBrush(svg, cursor);
                break;
            case Action.Select:
                brushRef.current = new SelectBrush(svg, cursor);
                break;
        }
    }, [action, buildingName]);

    return (
        <svg id="svg" ref={svgRef}></svg>
    );
};
