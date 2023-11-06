import { useSelector, useDispatch } from "react-redux";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { IconImage } from "./IconImage";
import { RootState } from "../stores/store";
import { setCitizen } from "../stores/selectionSlice";
import { CitizenImageItemsMap, GameItemsMap } from "../data/data";

export const CitizenSelect = () => {
	const game = useSelector((state: RootState) => state.buildingSelector.game);
	const citizen = useSelector(
		(state: RootState) => state.buildingSelector.citizen
	);

	const citizens = GameItemsMap[game].children.map(
		(c) => CitizenImageItemsMap[c]
	);

	const dispatch = useDispatch();

	return (
		<ToggleButtonGroup
			name="citizenSelect"
			value={citizen}
			size="lg"
			type="radio"
			onChange={(value) => dispatch(setCitizen(value))}
		>
			{citizens.map((citizen) => {
				return (
					<ToggleButton
						className="d-flex align-items-center"
						key={citizen.id}
						id={`radio-${citizen.name}`}
						value={citizen.id}
						variant="dark"
						title={citizen.name}
					>
						<IconImage
							size={32}
							imagePath={citizen.imagePath}
						/>
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};
