import { Building } from "./BuildingData";

export interface Citizen {
    id: string;
    name: string;
    buildings: Building[];
}