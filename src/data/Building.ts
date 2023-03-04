export interface Building {
    name: string;
    id: string;
    productionChain?: Building[];
}

export interface SVGBuilding {
    id: string;
    width: number;
    height: number;
    imagePath: string;
    colour: string;
}

export interface SvgData {
    id: string;
    width: number;
    height: number;
    colour: string;
}