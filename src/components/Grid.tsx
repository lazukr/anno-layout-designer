import { GridSlice } from "../stores/gridSlice";

interface Line {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	strokeWidth: number;
}

const BORDER_LINE_WIDTH = 5;
const LINE_WIDTH = 0.3;

export const Grid = ({ width, height, gridSize }: GridSlice) => {
	const lines: Line[] = [];

	for (let i = 0; i < width + 1; i++) {
		lines.push({
			x1: i * gridSize,
			y1: 0,
			x2: i * gridSize,
			y2: height * gridSize,
			strokeWidth: i === 0 || i === width ? BORDER_LINE_WIDTH : LINE_WIDTH,
		});
	}

	for (let i = 0; i < height + 1; i++) {
		lines.push({
			x1: 0,
			y1: i * gridSize,
			x2: width * gridSize,
			y2: i * gridSize,
			strokeWidth: i === 0 || i === height ? BORDER_LINE_WIDTH : LINE_WIDTH,
		});
	}

	return (
		<g>
			{lines.map(({ x1, y1, x2, y2, strokeWidth }, index) => (
				<line
					key={index}
					stroke="black"
					strokeWidth={strokeWidth}
					x1={x1}
					y1={y1}
					x2={x2}
					y2={y2}
				></line>
			))}
		</g>
	);
};
