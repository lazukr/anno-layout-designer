import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

export interface BaseModalProps {
    showState: boolean;
    children: ReactNode;
    title: string;
    buttonName: string;
    hideButton: boolean;
    hide: () => void;
    action: () => void;
}

export interface ImportExportModalProps {
    showState: boolean;
    hide: () => void;
};

export const BaseModal = ({
    showState,
    children,
    title, 
    buttonName,
    hideButton,
    hide,
    action,
}: BaseModalProps) => {
    return (
        <Modal show={showState} onHide={() => hide()}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" hidden={hideButton} onClick={() => {
            action();
            hide();
          }}>
            {buttonName}
          </Button>
        </Modal.Footer>
      </Modal>
    );
}