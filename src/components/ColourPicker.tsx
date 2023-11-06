import { SketchPicker } from "react-color";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import {
	hideColourPicker,
	setColour,
	updateColourPicker,
} from "../stores/colourPickerSlice";

export const ColourPicker = () => {
	const { active, colour } = useSelector(
		(state: RootState) => state.colourPicker
	);

	const dispatch = useDispatch();
	return (
		<div
			style={{
				padding: "9px",
				background: "#212529",
				borderRadius: "1px",
				boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
				display: "inline-block",
				cursor: "pointer",
			}}
			onClick={() => dispatch(updateColourPicker())}
		>
			<div
				style={{
					width: "32px",
					height: "32px",
					borderRadius: "2px",
					background: colour,
				}}
			></div>
			{active ? (
				<div
					style={{
						position: "absolute",
						zIndex: 2,
					}}
				>
					<div
						style={{
							position: "fixed",
							top: "0px",
							right: "0px",
							bottom: "0px",
							left: "0px",
						}}
						onClick={() => dispatch(hideColourPicker)}
					/>
					<SketchPicker
						color={colour}
						onChange={(e) => dispatch(setColour(e.hex))}
					/>
				</div>
			) : null}
		</div>
	);
};
