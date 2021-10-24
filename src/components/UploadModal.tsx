import { useState } from "react";
import { CustomModal } from "./CustomModal";
import { Input, Button, Icon, Divider, Segment } from "semantic-ui-react";

export const UploadModal = () => {
    const [valid] = useState(true);
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
            <Segment 
                className="basic" 
                textAlign="center"
            >
                <Input
                    type="file"
                    label="JSON:"
                    transparent
                    accept=".json"
                >
                </Input>
                <Divider horizontal>Or</Divider>
                <Input
                    type="text"
                    label="Base 64"
                    action={{
                        color:"green",
                        content:"Load",
                        icon:"file outline"
                    }}
                >
                </Input>
            </Segment>
        </CustomModal>
    );
};