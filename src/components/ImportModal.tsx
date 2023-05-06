import { Button, Form, FormGroup } from "react-bootstrap";
import React, { useState } from "react";

import { SerializedData, importSerializedBuildings, loadFromJSONBase64 } from "../editor/Serializer";
import { BaseModal, ImportExportModalProps } from "./BaseModal";


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
            hideButton={true}
            action={() => {}}
        >
            <FormGroup controlId="import-string">
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
                <Form.Control.Feedback type="invalid">
                    Invalid import string.
                </Form.Control.Feedback>
            </FormGroup>
            <Button disabled={!valid} onClick={() => importSerializedBuildings(value!)}>
                Import
            </Button>
        </BaseModal>
    );
};
