import { BuildingData } from "./BuildingData";

export interface CitizenData {
    name: string;
    imagePath: string;
    buildings: Record<string, BuildingData>;
}