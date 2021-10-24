import { CustomModal } from "./CustomModal";
import { Input, Button, Icon, Segment, Divider } from "semantic-ui-react";

export const DownloadModal = () => {
    return (
        <CustomModal
            header="Download"
            trigger={
                <Button secondary>
                    <Icon name="download" />
                    Download
                </Button>
            }
            valid={true}
            submitButton={{
                submitContent:"Download",
                submitIcon:"download",
                hideSubmit:true,
                onSubmit:() => {}
            }}
        >
            <Segment 
                className="basic"
                textAlign="center"
            > 
                <a href="file.json" download>
                    <Button>
                        <Icon name="download" />
                        Download as JSON
                    </Button>
                </a>
                <Divider horizontal>Or</Divider>
                <Input
                    label="Base 64"
                    labelPosition="left"
                    action={{
                        content:"Copy",
                        icon:"copy",
                        color:"green"
                    }}
                    defaultValue="test"
                    readOnly="true"
                >
                    
                </Input>
                <Divider horizontal>Or</Divider>
                <a href="file.png" download>
                    <Button>
                        <Icon name="download" />
                        Download as PNG
                    </Button>
                </a>
            </Segment>
        </CustomModal>
    );
};