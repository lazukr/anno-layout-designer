import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import React, { useState } from "react";

import { SerializedData, dataFromJSONBase64 } from "../editor/Serializer";
import { Upload } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { setGrid } from "../stores/gridSlice";
import { setPlacements } from "../stores/placementSlice";

export const ImportModal = () => {
	const [value, setValue] = useState<SerializedData>(null!);
	const [valid, setValid] = useState(false);

	const dispatch = useDispatch();

	return (
		<Modal.Body>
			<InputGroup className="mb-3">
				<Form.Control
					type="text"
					onChange={(e) => {
						const current = dataFromJSONBase64(e.target.value);
						if (current === undefined) {
							setValid(false);
						} else {
							setValid(true);
							setValue(current);
						}
					}}
					required
					isInvalid={!valid}
				/>
				<Button
					variant="outline-secondary"
					id="export-png"
					disabled={!valid}
					onClick={() => {
						dispatch(setGrid([value.width, value.height]));
						dispatch(setPlacements(value.placements));
					}}
				>
					<Upload />
				</Button>
				<Form.Control.Feedback type="invalid">
					Invalid import string.
				</Form.Control.Feedback>
			</InputGroup>
		</Modal.Body>
	);
};
