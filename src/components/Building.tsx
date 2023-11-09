import path from "path-browserify";
import { BuildingDisplayItem } from "../data/ItemDefinition";
import { BuildingDisplayDataURIMap } from "../data/data";

interface BuildingProps {
	gridSize: number;
	buildingInfo: BuildingDisplayItem;
	baked: boolean;
}

export const Building = ({ gridSize, buildingInfo, baked }: BuildingProps) => {
	const { id, width, height, imagePath } = buildingInfo;
	const realWidth = width * gridSize;
	const realHeight = height * gridSize;

	const imageSize = Math.min(realWidth, realHeight) / 2;
	const centerX = realWidth / 2 - imageSize / 2;
	const centerY = realHeight / 2 - imageSize / 2;

	return (
		<g
			id={id}
			width={realWidth}
			height={realHeight}
		>
			<rect
				width={realWidth}
				height={realHeight}
				strokeWidth={2}
				stroke="black"
			></rect>
			<image
				href={
					baked
						? BuildingDisplayDataURIMap[id.replace("^rotated", "")]
						: path.join(process.env.PUBLIC_URL, imagePath)
				}
				width={imageSize}
				height={imageSize}
				x={centerX}
				y={centerY}
			/>
		</g>
	);
};
