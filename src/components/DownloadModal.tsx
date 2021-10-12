import { useState } from "react";
import { CustomModal } from "./CustomModal";
import { Input, Label, Button, Icon, Segment, Divider } from "semantic-ui-react";

export const DownloadModal = () => {
    const [valid, setValid] = useState(true);
    return (
        <CustomModal
            header="Download"
            trigger={
                <Button secondary>
                    <Icon name="download" />
                    Download
                </Button>
            }
            valid={valid}
            submitButton={{
                submitContent:"Download",
                submitIcon:"download",
                hideSubmit:true,
                onSubmit:() => {}
            }}
        >
            <Segment textAlign="center" className="basic"> 
                <a href="file.json" download>
                    <Button>
                        <Icon name="download" />
                        Download as JSON
                    </Button>
                </a>
                <Divider horizontal>Or</Divider>
                <a href="file.txt" download>
                    <Button>
                        <Icon name="download" />
                        Download as Base64 String
                    </Button>
                </a>
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