export enum Direction {
    Horizontal,
    Vertical,
};

interface SvgLineAttribute {
    colour: string;
    width: number;
};

const BORDER_LINE: SvgLineAttribute = {
    colour: "black",
    width: 5,
};

const NORMAL_LINE: SvgLineAttribute = {
    colour: "black",
    width: 0.25,
};

interface SvgLineArguments {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};

export const getLineArgs = (isHorizontal: boolean, index: number, max: number, gridSize: number): SvgLineArguments => {
    const indexOffset = index * gridSize;
    const maxOffset = max * gridSize;

    return {
        x1: isHorizontal ? 0 : indexOffset,
        y1: isHorizontal ? indexOffset : 0,
        x2: isHorizontal ? maxOffset : indexOffset,
        y2: isHorizontal ? indexOffset : maxOffset,
    };
};

export const getAttrArgs = (index: number, max: number): SvgLineAttribute => {
    if (index === 0 || index === max) {
        return BORDER_LINE;
    } else {
        return NORMAL_LINE;
    }
};