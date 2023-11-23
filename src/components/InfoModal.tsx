import { Modal } from "react-bootstrap";

export const InfoModal = () => {
	return (
		<Modal.Body>
			<ul>
				<li>
					Add a building by select a building from the list and clicking it
					somewhere on the grid.
				</li>
				<li>
					Select a citizen to show buildings associated with that population
					group.
				</li>
				<li>
					Press the <b>any key</b> key to rotate a building.
				</li>
				<li>Use the hand tool to select and move existing buildings.</li>
				<li>Use the bucket tool and colour picker to colour code buildings.</li>
			</ul>
		</Modal.Body>
	);
};
