export enum Direction {
    Horizontal,
    Vertical,
};

interface SnapLineAttribute {
    stroke: string;
    strokeWidth: number;
    width: number;
};

const BORDER_LINE: SnapLineAttribute = {
    stroke: 'black',
    strokeWidth: 5,
    width: 1,
};

const BOLD_LINE: SnapLineAttribute = {
    stroke: 'black',
    strokeWidth: 1,
    width: 1,
};

const NORMAL_LINE: SnapLineAttribute = {
    stroke: 'black',
    strokeWidth: 0.25,
    width: 1,
};

interface SnapLineArguments {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};

export const getLineArgs = (isHorizontal: boolean, index: number, max: number, gridSize: number): SnapLineArguments => {
    const indexOffset = index * gridSize;
    const maxOffset = max * gridSize;

    return {
        x1: isHorizontal ? 0 : indexOffset,
        y1: isHorizontal ? indexOffset : 0,
        x2: isHorizontal ? maxOffset : indexOffset,
        y2: isHorizontal ? indexOffset : maxOffset,
    };
};

export const getAttrArgs = (index: number, max: number): SnapLineAttribute => {
    if (index === 0 || index === max) {
        return BORDER_LINE;
    } else {
        return NORMAL_LINE;
    }
};