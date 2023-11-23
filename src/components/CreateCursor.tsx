import { BuildingDisplayItemMap } from "../data/data";
import { CursorInfo } from "../editor/CursorInfo";
import { BuildingData, uuidv4 } from "../stores/placementSlice";

interface Cursor {
	gridSize: number;
	buildingData: BuildingData[];
}

export const CreateCursor = ({ gridSize, buildingData }: Cursor) => {
	return (
		<g>
			{buildingData.map(({ startX, startY, building, rotated, id, fill }) => {
				return (
					<use
						key={id}
						href={`#${building}${rotated ? "^rotated" : ""}`}
						x={startX * gridSize}
						y={startY * gridSize}
						fill={fill}
						fillOpacity={1}
						opacity={0.5}
					/>
				);
			})}
		</g>
	);
};

export function getBuildingFromCursorInfo(
	cursorInfo: CursorInfo,
	building: string,
	rotated: boolean
) {
	const { startX, startY, endX, endY, adjustX, adjustY } = cursorInfo;
	const { width: bWidth, height: bHeight } = BuildingDisplayItemMap[building];

	const width = rotated ? bHeight : bWidth;
	const height = rotated ? bWidth : bHeight;

	const adjustedStartX = adjustX ? startX + ((endX - startX) % width) : startX;
	const adjustedStartY = adjustY ? startY + ((endY - startY) % height) : startY;

	const buildings: BuildingData[] = [];
	for (let x = adjustedStartX; x <= endX; x += width) {
		for (let y = adjustedStartY; y <= endY; y += height) {
			buildings.push({
				startX: x,
				startY: y,
				endX: x + width - 1,
				endY: y + height - 1,
				id: uuidv4(),
				rotated: rotated,
				building: building,
				fill: "lightgray",
			});
		}
	}

	return buildings;
}

export function getCopyBuildingWithCursorInfo(
	buildings: BuildingData[],
	cursorInfo: CursorInfo
) {
	return buildings.map((b) => {
		return {
			...b,
			startX: b.startX + cursorInfo.startX,
			startY: b.startY + cursorInfo.startY,
			endX: b.endX + cursorInfo.startX,
			endY: b.endY + cursorInfo.startY,
		};
	});
}
