import { useEffect, useState } from "react";
import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { GRID_SIZE } from "../Constants";

declare const Snap: typeof SNAPSVG_TYPE;


export const useBoardCursor = () => {
    const [cell, setCell] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const editor = Snap("#snap");
        editor.unmousemove();

        let highlight = editor.rect(0, 0, 0, 0);
        editor.mousemove((e) => {
            const elem = document.querySelector("#snap");
            const bound = elem!.getBoundingClientRect();
            const x = Math.floor((e.pageX - bound.left) / GRID_SIZE);
            const y = Math.floor((e.pageY - bound.top) / GRID_SIZE);
            setCell({
                x: x,
                y: y, 
            });

            highlight.remove();
            highlight = editor.rect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            highlight.attr({
                fill: "red",
                fillOpacity: 0.3,
            });
        });
    }, []);

    return cell;
};