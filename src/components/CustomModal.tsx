import { Modal, Button, } from "semantic-ui-react";
import { useToggle } from "../hooks/useToggle";

export type CustomModalProps = {
    header: string,
    children: React.ReactNode,
    trigger: React.ReactNode,
    valid: boolean,
    submitButton: SubmitButtonProps,
};

export type SubmitButtonProps = {
    submitContent: string,
    submitIcon: string,
    hideSubmit: boolean,
    onSubmit: () => void,
};

export const CustomModal = (props: CustomModalProps) => {
    const {
        header,
        children,
        trigger,
        valid,
        submitButton
    } = props;

    const {
        submitContent,
        submitIcon,
        hideSubmit,
        onSubmit,
    } = submitButton;

    const [open, toggleOpen] = useToggle(false);
    const submit = () => {
        onSubmit();
        toggleOpen();
    }

    return (
        <Modal
            closeIcon
            onClose={toggleOpen}
            onOpen={toggleOpen}
            open={open}
            trigger={trigger}
            className="ui mini"
        >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
            <Modal.Actions>
                {!hideSubmit && <Button
                    content={submitContent}
                    labelPosition="right"
                    icon={submitIcon}
                    onClick={submit}
                    positive
                    required
                    disabled={! valid}
                >
                </Button>}
            </Modal.Actions>
        </Modal>
    );
};