import { useEffect, useRef } from "react";
import { Action } from "../editor/action";
import { SvgCanvas } from "../editor/SvgCanvas";
import "../styles/editor.scss";
import { Brush } from "../editor/Brush";
import { getBrushFromFactory } from "../editor/BrushFactory";

const GRID_SIZE = 32;
export interface EditorProps {
    width: number;
    height: number;
    buildingName: string;
    colour: string;
    action: Action;
};

export const Editor = ({
    width,
    height,
    buildingName,
    colour,
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
        brushRef.current = getBrushFromFactory(action, svg, cursor, buildingName, colour);
    });

    return (
        <svg id="svg" ref={svgRef}></svg>
    );
};
