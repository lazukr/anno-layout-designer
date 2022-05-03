import React, { useState } from "react";
import { Input, Button, Modal, Form } from "semantic-ui-react";
import { GRID } from "../utils/Constants";

export type NewModalProps = {
    currentWidth: number;
    currentHeight: number;
    setDimension: (width: number, height: number) => void;
};

export const NewModal = ({
    currentWidth,
    currentHeight,
    setDimension,
}: NewModalProps) => {
    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState(currentWidth);
    const [height, setHeight] = useState(currentHeight);
    const submit = () => {
        setDimension(width, height);
        setOpen(false);
    }

    const closeModal = () => {
        setWidth(currentWidth);
        setHeight(currentHeight);
        setOpen(false);
    }

    return (
        <Modal
            as={Form}
            className="ui tiny"
            onClose={() => closeModal()}
            onOpen={() => setOpen(true)}
            onSubmit={() => submit()}
            open={open}
            trigger={
                <Button 
                    secondary
                    icon="file"
                    content="New"
                />
            }
        >
            <Modal.Header>New Layout</Modal.Header>
            <Modal.Content>
                <Input
                    className="large"
                    inline
                    label="Width"
                    type="number"
                    min={GRID.MIN_DIMENSION}
                    max={GRID.MAX_DIMENSION}
                    defaultValue={width}
                    control={Input}
                    required
                    onChange={(e) => setWidth(e.target.valueAsNumber)}
                />
                <Input
                    className="large"
                    inline
                    label="Height"
                    type="number"
                    min={GRID.MIN_DIMENSION}
                    max={GRID.MAX_DIMENSION}
                    defaultValue={height}
                    control={Input}
                    required
                    onChange={(e) => setHeight(e.target.valueAsNumber)}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    negative
                    icon="close"
                    content="Cancel"
                    onClick={() => closeModal()}
                />
                <Button
                    positive
                    icon="plus"
                    content="Create"
                />
            </Modal.Actions>
        </Modal>
    );
};