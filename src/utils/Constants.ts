export const GRID = {
    // size for svg
    SIZE: 32,
    // grid constraints
    MIN_DIMENSION: 10,
    DEFAULT_DIMENSION: 50,
    MAX_DIMENSION: 500,
};

export const LINE = {
    NORMAL: {
        stroke: 'black',
        strokeWidth: 0.25,
        width: 1,
    },
    SEMI_BOLD: {
        stroke: 'black',
        strokeWidth: 0.5,
        width: 1,
    },
    BOLD: {
        stroke: 'black',
        strokeWidth: 1,
        width: 1,
    },
    BORDER: {
        stroke: 'black',
        strokeWidth: 5,
        width: 1,
    }
};

export const DEFAULT_GAME = "1800";
export const DEFAULT_POP: {[key: string]: string} = {
    "1800": "1800_Farmers"
}