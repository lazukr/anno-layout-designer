import { CitizenData } from "./CitizenData";

export interface GameData {
    name: string;
    title: string;
    citizens: Record<string, CitizenData>;
}