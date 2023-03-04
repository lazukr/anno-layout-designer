import { Building } from "./Building";

export interface Citizen {
    id: string;
    name: string;
    buildings: Building[];
}