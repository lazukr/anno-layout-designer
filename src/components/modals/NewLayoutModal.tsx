import React, { SetStateAction, useState, Dispatch } from "react";
import { Modal, Button, Input, Label, Icon } from "semantic-ui-react";
import { EditorSizeRange } from "../../Config";

export interface NewLayoutModalProps {
    setBoardWidth: Dispatch<SetStateAction<number>>;
    setBoardHeight: Dispatch<SetStateAction<number>>;
};

export const NewLayoutModal = (props: NewLayoutModalProps) => {
    const {
        setBoardHeight,
        setBoardWidth,
    } = props;

    const [open, setOpen] = useState(false);
    const [valid, setValid] = useState(true);
    const [localHeightValue, setLocalHeightValue] = useState(EditorSizeRange.default);
    const [localWidthValue, setLocalWidthValue] = useState(EditorSizeRange.default);

    const isValidDimensionSize = (dimension: number): boolean => {
        if (isNaN(dimension) ||
            dimension < EditorSizeRange.min ||
            dimension > EditorSizeRange.max) 
        {
            return false;
        }
        return true;
    }

    const onCreateNew = (): void => {
        if ( ! isValidDimensionSize(localHeightValue) ||
             ! isValidDimensionSize(localWidthValue)) 
        {
            setValid(false);
            setOpen(true);
            return;
        }

        setBoardHeight(localHeightValue);
        setBoardWidth(localWidthValue);
        setValid(true);
        setOpen(false);
    };

    const onOpen = (): void => {
        setOpen(true);
        setValid(true);
        setLocalHeightValue(EditorSizeRange.default);
        setLocalWidthValue(EditorSizeRange.default);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => onOpen()}
            open={open}
            trigger={
                <Button secondary>
                    <Icon name="file" />
                    New
                </Button>
            }
            className="ui mini"
        >
            <Modal.Header>New Layout Design Size</Modal.Header>
            <Modal.Content>
                <Input
                    className="large"
                    label="Width:"
                    type="number"
                    min={EditorSizeRange.min}
                    max={EditorSizeRange.max}
                    defaultValue={localWidthValue}
                    onChange={e => setLocalWidthValue(e.target.valueAsNumber)}
                    required
                >
                </Input>
                <Input
                    className="large"
                    label="Height:"
                    type="number"
                    min={EditorSizeRange.min}
                    max={EditorSizeRange.max}
                    defaultValue={localHeightValue}
                    onChange={e => setLocalHeightValue(e.target.valueAsNumber)}
                    required
                >
                </Input>
                <Label
                    className={`red basic ${valid ? "hidden" : "visible"}`}
                >
                    {`Minimum value is ${EditorSizeRange.min} and
                    Maximum value is ${EditorSizeRange.max}`}
                </Label>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Cancel"
                    labelPosition="left"
                    floated="left"
                    icon="cancel"
                    onClick={() => setOpen(false)}
                    negative
                    required
                >
                </Button>
                <Button
                    content="Create"
                    labelPosition="right"
                    icon="plus"
                    onClick={onCreateNew}
                    positive
                    required
                >
                </Button>
            </Modal.Actions>
        </Modal>
    );
}