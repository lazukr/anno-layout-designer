import { Button, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Files, FiletypePng } from "react-bootstrap-icons";

import { saveAsJSONBase64, saveAsPNG } from "../editor/Serializer";
import { BaseModal, ImportExportModalProps } from "./BaseModal";

export const ExportModal = ({
    showState,
    hide,
}: ImportExportModalProps) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        const getBase64 = async () => {
            setValue(await saveAsJSONBase64());
        }
        getBase64();
    });

    return (
        <BaseModal
            showState={showState}
            hide={hide}
            title={"Export Layout"}
            buttonName=""
            showButton={false}
            action={() => {}}
        >
            <InputGroup className="mb-3">
                <Form.Control
                    readOnly={true}
                    value={value}
                />
                <Button variant="outline-secondary" id="export-json-base64">
                    <Files onClick={() => navigator.clipboard.writeText(value)}/>
                </Button>
                <Button variant="outline-secondary" id="export-png">
                    <FiletypePng onClick={saveAsPNG}/>
                </Button>
            </InputGroup>
        </BaseModal>
    );
};
