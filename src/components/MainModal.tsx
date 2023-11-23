import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { hideModal } from "../stores/modalSlice";
export const MainModal = () => {
	const active = useSelector((state: RootState) => state.modal.active);

	return (
		<Modal
			show={active}
			onHide={() => hideModal()}
			data-testid="modal"
		>
			<Modal.Header closeButton>
				<Modal.Title data-testid="title">{""}</Modal.Title>
			</Modal.Header>
		</Modal>
	);
};
