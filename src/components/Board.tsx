import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { Grid } from "./Grid";
import { Buildings } from "./Buildings";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	CreateCursor,
	getBuildingFromCursorInfo,
	getCopyBuildingWithCursorInfo,
} from "./CreateCursor";
import { Position } from "../editor/Position";
import { CursorInfo } from "../editor/CursorInfo";
import {
	BuildingCursorGroup,
	CursorAction,
	SelectionCursorGroup,
	setAction,
} from "../stores/cursorActionSlice";
import {
	BuildingData,
	addPlacements,
	colourPlacements,
	overlaps,
	removePlacements,
} from "../stores/placementSlice";
import { Placements } from "./Placements";
import { SelectRect } from "./SelectRect";

export const Board = () => {
	const svg = useRef<SVGSVGElement>(null!);
	const [dragging, drag] = useState(false);
	const [rotated, setRotated] = useState(false);
	const [dragStart, setDragStart] = useState<Position>({
		x: 0,
		y: 0,
	});

	const [cursorInfo, setCursorInfo] = useState<CursorInfo>({
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0,
		adjustX: false,
		adjustY: false,
	});

	const [localBuildingSelection, setLocalBuildingSelection] = useState<
		BuildingData[]
	>([]);

	const [copySelection, setCopySelection] = useState<BuildingData[]>([]);

	const dispatch = useDispatch();

	const { width, height, gridSize } = useSelector(
		(state: RootState) => state.grid
	);
	const building = useSelector(
		(state: RootState) => state.buildingSelector.building
	);

	const fillColour = useSelector(
		(state: RootState) => state.colourPicker.colour
	);

	const placements = useSelector(
		(state: RootState) => state.placements.placements
	);

	const action = useSelector((state: RootState) => state.cursorAction.action);

	useEffect(() => {
		if (action !== CursorAction.Place) {
			setLocalBuildingSelection(
				getBuildingFromCursorInfo(cursorInfo, building, rotated)
			);
		} else {
			setLocalBuildingSelection(
				getCopyBuildingWithCursorInfo(copySelection, cursorInfo)
			);
		}
	}, [cursorInfo, building, action, copySelection, rotated]);

	const rotate = () => {
		setRotated(!rotated);
	};

	useEffect(() => {
		document.addEventListener("keydown", rotate);
		return () => {
			document.removeEventListener("keydown", rotate);
		};
	});

	const getColourForSelectRectAction = useCallback(
		(action: CursorAction, fillColour: string) => {
			switch (action) {
				case CursorAction.Colour:
					return fillColour;
				case CursorAction.Delete:
					return "red";
				case CursorAction.Select:
					return "green";
				default:
					return "black";
			}
		},
		[]
	);

	const setCursorPosition = useCallback((x: number, y: number) => {
		setCursorInfo((prevstate) => {
			if (prevstate.startX === x && prevstate.startY === y) {
				return prevstate;
			}

			return {
				...prevstate,
				startX: x,
				startY: y,
				endX: x,
				endY: y,
			};
		});
	}, []);

	const onMouseDown = useCallback((x: number, y: number) => {
		drag(true);
		setDragStart({
			x: x,
			y: y,
		});
	}, []);

	const onMouseUp = useCallback(
		(
			selection: CursorInfo,
			buildingData: BuildingData[],
			placements: BuildingData[],
			fillColour: string,
			dragStart: Position
		) => {
			drag(false);
			switch (action) {
				case CursorAction.Create:
					dispatch(addPlacements(buildingData));
					break;
				case CursorAction.Delete:
					dispatch(removePlacements(selection));
					break;
				case CursorAction.Colour:
					dispatch(colourPlacements([selection, fillColour]));
					break;
				case CursorAction.Select:
					const buildings = placements
						.filter((p) => {
							return overlaps(p, selection);
						})
						.map((b) => {
							return {
								...b,
								startX: b.startX - dragStart.x,
								startY: b.startY - dragStart.y,
								endX: b.endX - dragStart.x,
								endY: b.endY - dragStart.y,
							};
						});

					if (buildings.length === 0) {
						break;
					}

					setCopySelection(buildings);
					dispatch(removePlacements(selection));
					dispatch(setAction(CursorAction.Place));
					break;
				case CursorAction.Place:
					dispatch(addPlacements(buildingData));
					dispatch(setAction(CursorAction.Select));
					break;
			}
		},
		[dispatch, action]
	);

	const onMouseMove = useCallback(
		(
			event: React.MouseEvent<SVGSVGElement, MouseEvent>,
			dragging: boolean,
			dragStart: Position,
			action: CursorAction
		) => {
			const point = new DOMPointReadOnly(event.clientX, event.clientY);
			const pt = point.matrixTransform(svg.current?.getScreenCTM()?.inverse());
			const newX = Math.max(0, Math.floor(pt.x / gridSize));
			const newY = Math.max(0, Math.floor(pt.y / gridSize));

			if (dragging && action !== CursorAction.Place) {
				const { x, y } = dragStart;
				const isNewXLessThanX = newX < x;
				const isNewYLessThanY = newY < y;

				const newStartX = isNewXLessThanX ? newX : x;
				const newStartY = isNewYLessThanY ? newY : y;
				const newEndX = isNewXLessThanX ? x : newX;
				const newEndY = isNewYLessThanY ? y : newY;

				setCursorInfo((prevstate) => {
					if (
						prevstate.startX === newStartX &&
						prevstate.startY === newStartY &&
						prevstate.endX === newEndX &&
						prevstate.endY === newEndY &&
						prevstate.adjustX === isNewXLessThanX &&
						prevstate.adjustY === isNewYLessThanY
					) {
						return prevstate;
					}

					return {
						startX: newStartX,
						startY: newStartY,
						endX: newEndX,
						endY: newEndY,
						adjustX: isNewXLessThanX,
						adjustY: isNewYLessThanY,
					};
				});
			} else {
				setCursorPosition(newX, newY);
			}
		},
		[gridSize, setCursorPosition]
	);

	return (
		<svg
			id="svg"
			ref={svg}
			width={width * gridSize}
			height={height * gridSize}
			onMouseMove={(e) => onMouseMove(e, dragging, dragStart, action)}
			onMouseDown={() => onMouseDown(cursorInfo.startX, cursorInfo.startY)}
			onMouseUp={() =>
				onMouseUp(
					cursorInfo,
					localBuildingSelection,
					placements,
					fillColour,
					dragStart
				)
			}
		>
			<Buildings baked={false} />
			<Grid
				width={width}
				height={height}
				gridSize={gridSize}
			/>
			<Placements gridSize={gridSize} />
			{BuildingCursorGroup.includes(action) && (
				<CreateCursor
					buildingData={localBuildingSelection}
					gridSize={gridSize}
				/>
			)}
			{SelectionCursorGroup.includes(action) && (
				<SelectRect
					cursorInfo={cursorInfo}
					gridSize={gridSize}
					colour={getColourForSelectRectAction(action, fillColour)}
				/>
			)}
		</svg>
	);
};
