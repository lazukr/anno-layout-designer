import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { useDispatch } from "react-redux";
import { setGrid } from "../stores/gridSlice";

const MIN = 10;
const MAX = 50;

export const NewLayoutModal = () => {
	const { width, height } = useSelector((state: RootState) => state.grid);
	const dispatch = useDispatch();

	const [localWidth, setLocalWidth] = useState(width);
	const [localHeight, setLocalHeight] = useState(height);

	return (
		<Modal.Body>
			Set layout size between {MIN} - {MAX}.
			<InputGroup className="mb-3">
				<InputGroup.Text id="basic-addon1">Width</InputGroup.Text>
				<Form.Control
					required
					placeholder="Width"
					aria-label="Wdith"
					aria-describedby="basic-addon1"
					type="number"
					value={localWidth}
					min={MIN}
					max={MAX}
					step="any"
					onChange={(e) =>
						setLocalWidth(Math.min(parseInt(e.target.value) || MIN, MAX))
					}
				/>
				<Form.Control.Feedback type="invalid">
					Value can only be between {MIN} - {MAX}.
				</Form.Control.Feedback>
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Text id="basic-addon1">Height</InputGroup.Text>
				<Form.Control
					required
					placeholder="Height"
					aria-label="Height"
					aria-describedby="basic-addon1"
					type="number"
					value={localHeight}
					min={MIN}
					max={MAX}
					step="any"
					onChange={(e) =>
						setLocalHeight(Math.min(parseInt(e.target.value) || MIN, MAX))
					}
				/>
				<Form.Control.Feedback type="invalid">
					Value can only be between {MIN} - {MAX}.
				</Form.Control.Feedback>
			</InputGroup>
			<Button
				variant="primary"
				onClick={() => {
					dispatch(setGrid([localWidth, localHeight]));
				}}
			>
				Create New
			</Button>
		</Modal.Body>
	);
};
