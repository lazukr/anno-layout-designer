import { Button, ButtonGroup, Container } from "react-bootstrap";
import {
	FileEarmarkArrowDown,
	FileEarmarkArrowUp,
	FilePlus,
	InfoSquare,
} from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { ModalType, updateType } from "../stores/modalSlice";

export const ActionBar = () => {
	const dispatch = useDispatch();
	return (
		<Container>
			<ButtonGroup>
				<Button
					variant="dark"
					size="lg"
					title="New Layout"
					onClick={() => dispatch(updateType(ModalType.NewGrid))}
				>
					<FilePlus />
				</Button>
				<Button
					variant="dark"
					size="lg"
					title="Import Layout"
					onClick={() => dispatch(updateType(ModalType.Import))}
				>
					<FileEarmarkArrowUp />
				</Button>
				<Button
					variant="dark"
					size="lg"
					title="Export Layout"
					onClick={() => dispatch(updateType(ModalType.Export))}
				>
					<FileEarmarkArrowDown />
				</Button>
				<Button
					variant="dark"
					size="lg"
					title="Info"
					onClick={() => dispatch(updateType(ModalType.Info))}
				>
					<InfoSquare />
				</Button>
			</ButtonGroup>
		</Container>
	);
};
