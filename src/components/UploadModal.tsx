import { useState } from "react";
import { CustomModal } from "./CustomModal";
import { Input, Label, Button, Icon } from "semantic-ui-react";

export const UploadModal = () => {
    const [valid, setValid] = useState(true);
    return (
        <CustomModal
            header="Upload"
            trigger={
                <Button secondary>
                    <Icon name="upload" />
                    Upload
                </Button>
            }
            valid={valid}
            submitButton={{
                submitContent:"",
                submitIcon:"",
                hideSubmit:true,
                onSubmit:() => {}
            }}
        >
            <Input
                type="file"
                label="JSON:"
                transparent
                accept=".json"
            >
            </Input>
            <Input
                type="text"
                label="Base 64"
                action={{
                    color:"green",
                    content:"Load"
                }}
            >
            </Input>
        </CustomModal>
    );
};