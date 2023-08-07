import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Files, FiletypePng } from "react-bootstrap-icons";

import { saveAsJSONBase64, saveAsPNG } from "../editor/Serializer";
import { BaseModal } from "./BaseModal";
import { SvgCanvas } from "../editor/SvgCanvas";


interface ExportModalProps {
    showState: boolean;
    hide: () => void;
};

export const ExportModal = ({
    showState,
    hide,
}: ExportModalProps) => {
    const [value, setValue] = useState("");
    useEffect(() => {
        const getBase64 = async () => {
            setValue(await saveAsJSONBase64(SvgCanvas.GetSVG()));
        }
        getBase64();
    });

    return (
        <BaseModal
            showState={showState}
            hide={hide}
            title={"Export Layout"}
        >
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        readOnly={true}
                        value={value}
                    />
                    <Button variant="outline-secondary" id="export-json-base64">
                        <Files onClick={() => navigator.clipboard.writeText(value)}/>
                    </Button>
                    <Button variant="outline-secondary" id="export-png">
                        <FiletypePng onClick={async () => {
                            await saveAsPNG(SvgCanvas.GetSVG());
                        }}/>
                    </Button>
                </InputGroup>
            </Modal.Body>
        </BaseModal>
    );
};
