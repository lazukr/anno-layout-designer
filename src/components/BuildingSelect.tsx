import { useSelector, useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { IconImage } from "./IconImage";
import { BuildingImageItem } from "../data/ItemDefinition";
import { RootState } from "../stores/store";
import { CitizenImageItemsMap, BuildingImageItemsMap } from "../data/data";
import { setBuilding } from "../stores/selectionSlice";
import { Button, SplitButton } from "react-bootstrap";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "../styles/button.scss";

export const BuildingSelect = () => {
	const citizen = useSelector(
		(state: RootState) => state.buildingSelector.citizen
	);

	const dispatch = useDispatch();

	const buildings = CitizenImageItemsMap[citizen].children.map(
		(b) => BuildingImageItemsMap[b]
	);

	return (
		<ToggleButtonGroup
			name="buildingSelect"
			size="lg"
		>
			{buildings.map((building) => {
				return BuildingButton(building, dispatch, false);
			})}
		</ToggleButtonGroup>
	);
};

function BuildingButton(
	buildingImage: BuildingImageItem,
	dispatch: Dispatch<AnyAction>,
	openSideways: boolean
) {
	if (buildingImage.children.length === 0) {
		return LeafNodeBuildingButton(buildingImage, dispatch);
	}
	return InternalNodeBuildingButton(buildingImage, dispatch, openSideways);
}

function LeafNodeBuildingButton(
	buildingImage: BuildingImageItem,
	dispatch: Dispatch<AnyAction>
) {
	const { id, imagePath } = buildingImage;

	return (
		<Button
			className="d-flex align-items-center"
			key={id}
			id={`building-${id}`}
			value={id}
			variant="dark"
			onClick={(_) => dispatch(setBuilding(id))}
		>
			<IconImage
				size={32}
				imagePath={imagePath}
			/>
		</Button>
	);
}

function InternalNodeBuildingButton(
	buildingImage: BuildingImageItem,
	dispatch: Dispatch<AnyAction>,
	openSideways: boolean
) {
	const { id, children, imagePath } = buildingImage;
	return (
		<SplitButton
			className="custom-dropdown-toggle"
			key={id}
			id={`button-${id}`}
			variant="dark"
			drop={openSideways ? "end" : "down"}
			onClick={(_) => dispatch(setBuilding(id))}
			title={
				<IconImage
					size={32}
					imagePath={imagePath}
				/>
			}
			children={children.map((c) => BuildingButton(c, dispatch, true))}
		></SplitButton>
	);
}
