import { useEffect, useRef, useState } from "react";
import { Action } from "../editor/action";
import { SvgCanvas } from "../editor/SvgCanvas";
import "../styles/editor.scss";
import { Svg } from "@svgdotjs/svg.js";
import { SVG } from "@svgdotjs/svg.js";
import { Board } from "../editor/Board";
import { createAllBuildings } from "../editor/Building";
import { PositionTracker } from "../editor/PositionTracker";
import { Brush, getBrush } from "../editor/Brush";
import { CreateBrush } from "../editor/CreateBrush";

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
    const positionTracker = useRef<PositionTracker | null>(null);
    const brushRef = useRef<Brush | null>(null);
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
        const svg = SVG(svgRef.current) as Svg;
        const realWidth = width * GRID_SIZE;
        const realHeight = height * GRID_SIZE;

        svg.size(realWidth, realHeight);
        svg.clear();
        createAllBuildings(svg, GRID_SIZE);

        new Board({
            svg: SVG(svgRef.current) as Svg,
            width: width,
            height: height,
            gridSize: GRID_SIZE,
        })
    }, [width, height]);

    useEffect(() => {
        const svg = SVG(svgRef.current) as Svg;
        positionTracker.current = new PositionTracker(svg, GRID_SIZE);
    }, []);

    useEffect(() => {
        const svg = SVG(svgRef.current) as Svg;
        brushRef.current?.remove();
        brushRef.current = getBrush(svg, action, buildingName);
        positionTracker.current?.attachMouseMove(brushRef.current);
        positionTracker.current?.attachCreateDrag(brushRef.current);
        positionTracker.current?.attachMouseUp(brushRef.current);
    }, [action, buildingName]);



    return (
        <svg id="svg" ref={svgRef}></svg>
    );
};