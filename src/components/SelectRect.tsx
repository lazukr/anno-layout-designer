import { CursorInfo } from "../editor/CursorInfo";

interface SelectRectProps {
	cursorInfo: CursorInfo;
	gridSize: number;
	colour: string;
}

export const SelectRect = ({
	cursorInfo,
	gridSize,
	colour,
}: SelectRectProps) => {
	const { startX, startY, endX, endY } = cursorInfo;
	return (
		<rect
			strokeWidth={2}
			stroke="blue"
			x={startX * gridSize}
			y={startY * gridSize}
			fill={colour}
			width={Math.max(endX - startX + 1, 1) * gridSize}
			height={Math.max(endY - startY + 1, 1) * gridSize}
			opacity={0.5}
		/>
	);
};
