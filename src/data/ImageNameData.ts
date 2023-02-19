export interface SelectionData {
    id: string;
    name: string;
    imagePath: string;
    children?: SelectionData[];
}