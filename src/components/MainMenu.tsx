import { Menu, Icon, Button, Dropdown } from "semantic-ui-react";
import { NewLayoutModal, NewLayoutModalProps } from "./modals/NewLayoutModal";

export interface MenuProps {
    newLayoutModalProps: NewLayoutModalProps;
};

export const MainMenu = (props: MenuProps) => {

    const {
        newLayoutModalProps
    } = props;

    return (
        <Menu
            inverted
            attached
            size="huge"
        >
            <Menu.Item header>
                Anno Layout Designer
            </Menu.Item>

            <Dropdown
                item
                text="Game"
                className="inverted"
            >
                <Dropdown.Menu>
                    <Dropdown.Item text="Anno 1800"/>
                </Dropdown.Menu>
            </Dropdown>
            <Button.Group compact>
                <NewLayoutModal
                    setBoardHeight={newLayoutModalProps.setBoardHeight}
                    setBoardWidth={newLayoutModalProps.setBoardWidth}
                />
                <Button 
                    secondary
                    icon="upload"
                    content="Upload"
                />
                <Button 
                    secondary
                    icon="download"
                    content="download"
                />
            </Button.Group>
            <Button.Group
                icon
                size="big"
            >
                <Button positive>
                    <Icon name="pencil"></Icon>
                </Button>
                <Button negative>
                    <Icon name="eraser"></Icon>
                </Button>
            </Button.Group>            
            <Menu.Menu position="right">
                <Menu.Item
                    icon="github"
                    name="Github"
                    href="https://github.com/lazukr"
                    target="_blank"
                    rel="noreferrer"
                >
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};
