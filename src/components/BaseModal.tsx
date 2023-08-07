import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

export interface BaseModalProps {
    showState: boolean;
    children: ReactNode;
    title: string;
    hide: () => void;
}

export const BaseModal = ({
    showState,
    children,
    title, 
    hide,
}: BaseModalProps) => {
    return (
        <Modal 
          show={showState} 
          onHide={() => hide()}
          data-testid="modal"
        >
        <Modal.Header closeButton>
          <Modal.Title data-testid="title">{title}</Modal.Title>
        </Modal.Header>
        {children}
      </Modal>
    );
}