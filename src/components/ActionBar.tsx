import { Container, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { HandIndexFill, EraserFill, PaintBucket } from "react-bootstrap-icons";
import { setAction, CursorAction } from "../stores/cursorActionSlice";
import { ColourPicker } from "./ColourPicker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";

export const ActionBar = () => {
	const action = useSelector((state: RootState) => state.cursorAction.action);
	const dispatch = useDispatch();

	return (
		<Container>
			<ToggleButtonGroup
				type="radio"
				name="actions"
				size="lg"
				value={action}
				onChange={(e) => dispatch(setAction(e))}
			>
				<ToggleButton
					id="tbg-radio-select"
					title="Select building"
					value={CursorAction.Select}
					variant="dark"
				>
					<HandIndexFill color="green" />
				</ToggleButton>
				<ToggleButton
					id="tbg-radio-delete"
					title="Delete building"
					value={CursorAction.Delete}
					variant="dark"
				>
					<EraserFill color="red" />
				</ToggleButton>
				<ToggleButton
					id="tbg-radio-fill"
					title="Colour building"
					value={CursorAction.Colour}
					variant="dark"
				>
					<PaintBucket />
				</ToggleButton>
				<ColourPicker />
			</ToggleButtonGroup>
		</Container>
	);
};
