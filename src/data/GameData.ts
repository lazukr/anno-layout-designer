import { Citizen } from "./CitizenData";
export interface Game {
    id: string;
    name: string;
    citizens: Record<string, Citizen>;
}