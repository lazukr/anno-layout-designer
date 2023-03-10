import { Citizen } from "./Citizen";
export interface Game {
    id: string;
    name: string;
    citizens: Record<string, Citizen>;
}