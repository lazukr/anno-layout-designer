import { useEffect, useState } from "react";
import { GRID_SIZE } from "../Constants";

export interface Board {
    width: number,
    height: number,
};

export interface CellData {
    occupied: boolean,
    color: string,
};

export const useBoard = (props: Board) => {
    const {
        width,
        height,
    } = props;

 
    useEffect(() => {
        const board = new Array(width / GRID_SIZE)
        .fill(false)
        .map(i => new Array(height / GRID_SIZE).fill(null));

    }, [width, height]);



};