import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

interface PlacementProps {
	gridSize: number;
}

export const Placements = ({ gridSize }: PlacementProps) => {
	const placements = useSelector(
		(state: RootState) => state.placements.placements
	);

	return (
		<g>
			{placements.map(({ startX, startY, building, rotated, id, fill }) => {
				return (
					<use
						key={id}
						href={`#${building}${rotated ? "^rotated" : ""}`}
						x={startX * gridSize}
						y={startY * gridSize}
						className="placed"
						fill={fill}
						fillOpacity={1}
					/>
				);
			})}
		</g>
	);
};
