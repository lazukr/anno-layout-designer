import { Button, Form, InputGroup } from "react-bootstrap";
import React, { useState } from "react";

import { SerializedData, importSerializedBuildings, loadFromJSONBase64 } from "../editor/Serializer";
import { BaseModal, ImportExportModalProps } from "./BaseModal";
import { Upload } from "react-bootstrap-icons";


export const ImportModal = ({
    showState,
    hide,
}: ImportExportModalProps) => {
    const [value, setValue] = useState<SerializedData>();
    const [valid, setValid] = useState(false);

    return (
        <BaseModal
            showState={showState}
            hide={hide}
            title={"Import Layout"}
            buttonName=""
            showButton={false}
            action={() => {}}
        >
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    onChange={e => {
                        const current = loadFromJSONBase64(e.target.value);
                        if (current === undefined) {
                            setValid(false);
                        } else {
                            setValid(true);
                            setValue(current);
                        }
                    }}
                    required
                    isInvalid={!valid}
                />
                <Button variant="outline-secondary" id="export-png" disabled={!valid}>
                    <Upload onClick={async () => {
                        importSerializedBuildings(value!);
                        setValue(undefined);
                        setValid(false);
                        hide();
                    }}/>
                </Button>
                <Form.Control.Feedback type="invalid">
                    Invalid import string.
                </Form.Control.Feedback>
            </InputGroup>
        </BaseModal>
    );
};
