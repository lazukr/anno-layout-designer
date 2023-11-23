import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Files, FiletypePng } from "react-bootstrap-icons";

import {
	SerializedData,
	dataToJSONBase64,
	saveAsPNG,
} from "../editor/Serializer";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Grid } from "./Grid";
import { Placements } from "./Placements";
import { Buildings } from "./Buildings";

export const ExportModal = () => {
	const { width, height, gridSize } = useSelector(
		(state: RootState) => state.grid
	);
	const placements = useSelector(
		(state: RootState) => state.placements.placements
	);

	const [value, setValue] = useState("");

	const svgRef = useRef<SVGSVGElement>(null!);

	useEffect(() => {
		const exportData: SerializedData = {
			width: width,
			height: height,
			placements: placements,
		};

		setValue(dataToJSONBase64(exportData));
	}, [width, height, placements]);

	return (
		<Modal.Body>
			<InputGroup className="mb-3">
				<Form.Control
					readOnly={true}
					value={value}
				/>
				<Button
					variant="outline-secondary"
					id="export-json-base64"
				>
					<Files onClick={() => navigator.clipboard.writeText(value)} />
				</Button>
				<Button
					variant="outline-secondary"
					id="export-png"
				>
					<FiletypePng
						onClick={() => {
							saveAsPNG(svgRef.current);
						}}
					/>
				</Button>
			</InputGroup>
			<div hidden={true}>
				<ExportSvg
					gridSize={gridSize}
					width={width}
					height={height}
					ref={svgRef}
				/>
			</div>
		</Modal.Body>
	);
};

interface ExportSvgProps {
	gridSize: number;
	width: number;
	height: number;
}

const ExportSvg = forwardRef<SVGSVGElement, ExportSvgProps>(
	({ gridSize, width, height }, ref) => {
		return (
			<svg
				id="exportsvg"
				ref={ref}
				width={gridSize * width}
				height={gridSize * height}
			>
				<Buildings baked={true} />
				<Grid
					width={width}
					height={height}
					gridSize={gridSize}
				/>
				<Placements gridSize={gridSize} />
			</svg>
		);
	}
);
