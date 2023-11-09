import { useSelector } from "react-redux";
import { BuildingDisplayItemMap } from "../data/data";
import { Building } from "./Building";
import { RootState } from "../stores/store";

interface BuildingsProps {
	baked: boolean;
}

export const Buildings = ({ baked }: BuildingsProps) => {
	const gridSize = useSelector((state: RootState) => state.grid.gridSize);
	const buildingList = Object.values(BuildingDisplayItemMap).flatMap((b) => {
		return [
			b,
			{
				id: b.id + "^rotated",
				width: b.height,
				height: b.width,
				imagePath: b.imagePath,
			},
		];
	});

	return (
		<defs>
			{buildingList.map((b) => {
				return (
					<Building
						key={b.id}
						gridSize={gridSize}
						buildingInfo={b}
						baked={baked}
					/>
				);
			})}
		</defs>
	);
};
