import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { BaseModal } from "./BaseModal";

export interface NewLayoutModalProps {
    showState: boolean;
    hide: () => void;
    save: (width: number, height: number) => void;
    getCurrent: () => [curWidth: number, curHeight: number];
}

const MIN = 10;
const MAX = 50;

export const NewLayoutModal = ({
    showState,
    hide,
    save,
    getCurrent,
}: NewLayoutModalProps) => {
    const [curWidth, curHeight] = getCurrent();

    const reset = () => {
        setWidth(curWidth);
        setHeight(curHeight);
    };

    const [width, setWidth] = useState(curWidth);
    const [height, setHeight] = useState(curHeight);

    return (
        <BaseModal
            showState={showState}
            hide={() => {
                hide();
                reset();
            }}
            title={"New Layout"}
            buttonName="Create New"
            showButton={true}
            action={() => {
                hide();
                save(width, height);
            }}
        >
            Set layout size between {MIN} - {MAX}.
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Width</InputGroup.Text>
                <Form.Control
                    required
                    placeholder="Width"
                    aria-label="Wdith"
                    aria-describedby="basic-addon1"
                    type="number"
                    value={width}
                    min={MIN}
                    max={MAX}
                    step="any"
                    onChange={(e) => setWidth(Math.min(parseInt(e.target.value) || MIN, MAX))}
                />
                <Form.Control.Feedback type="invalid">
                    Value can only be between {MIN} - {MAX}.
                </Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Height</InputGroup.Text>
                <Form.Control
                    required
                    placeholder="Width"
                    aria-label="Wdith"
                    aria-describedby="basic-addon1"
                    type="number"
                    value={height}
                    min={MIN}
                    max={MAX}
                    step="any"
                    onChange={(e) => setHeight(Math.min(parseInt(e.target.value) || MIN, MAX))}
                />
                <Form.Control.Feedback type="invalid">
                    Value can only be between {MIN} - {MAX}.
                </Form.Control.Feedback>
            </InputGroup>
        </BaseModal>
    );
};