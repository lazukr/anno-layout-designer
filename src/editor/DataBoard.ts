export interface BuildingProps {
    instanceId: string;
    buildingId: string;
    gridX: number;
    gridY: number;
    isRotated: boolean;
}

interface DataBoardProps {
    width: number;
    height: number;
}

export class DataBoard {
    width: number;
    height: number;
    dataBoard: {[key: string]: BuildingProps};

    constructor({
        width,
        height,
    }: DataBoardProps) {
        this.width = width;
        this.height = height;
        this.dataBoard = {};
    }

    addBuilding(buildingProps: BuildingProps) {
        this.dataBoard[buildingProps.instanceId] = buildingProps;
    }

    getBuilding(instanceId: string) {
        return this.dataBoard[instanceId];
    }
    
    removeBuilding(instanceId: string) {
        delete this.dataBoard[instanceId];
    }
}