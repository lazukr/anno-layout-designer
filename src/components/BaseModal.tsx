import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

export interface BaseModalProps {
    showState: boolean;
    children: ReactNode;
    title: string;
    buttonName: string;
    showButton: boolean;
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
    showButton,
    hide,
    action,
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
        <Modal.Body>
            {children}
        </Modal.Body>
        {showButton && 
        <Modal.Footer data-testid="footer">
          <Button
            data-testid="button"
            variant="primary" 
            onClick={() => {
              action();
              hide();
            }}
          >
            {buttonName}
          </Button>
        </Modal.Footer>}
      </Modal>
    );
}