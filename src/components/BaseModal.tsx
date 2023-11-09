import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { ModalType, hideModal } from "../stores/modalSlice";
import { useDispatch } from "react-redux";
import { NewLayoutModal } from "./NewLayoutModal";
import { InfoModal } from "./InfoModal";
import { ImportModal } from "./ImportModal";
import { ExportModal } from "./ExportModal";

export const BaseModal = () => {
	const { active, type } = useSelector((state: RootState) => state.modal);

	const dispatch = useDispatch();

	return (
		<Modal
			show={active}
			onHide={() => dispatch(hideModal())}
			data-testid="modal"
		>
			<Modal.Header closeButton>
				<Modal.Title data-testid="title">{getTitle(type)}</Modal.Title>
			</Modal.Header>
			{getLayout(type)}
		</Modal>
	);
};

function getTitle(type: ModalType) {
	switch (type) {
		case ModalType.Export:
			return "Export Layout";
		case ModalType.NewGrid:
			return "New Grid";
		case ModalType.Import:
			return "Import Layout";
		case ModalType.Info:
			return "Information";
	}
}

function getLayout(type: ModalType) {
	switch (type) {
		case ModalType.Export:
			return <ExportModal />;
		case ModalType.NewGrid:
			return <NewLayoutModal />;
		case ModalType.Import:
			return <ImportModal />;
		case ModalType.Info:
			return <InfoModal />;
	}
}
