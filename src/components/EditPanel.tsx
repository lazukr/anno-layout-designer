import { Menu, Tab } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import PopData from "../pop_data.json";

const tabs = PopData.map(item => {
    return {
        menuItem: item.key,
        pane: {
            key: item.key,
            content: item.content,
            inverted: true,
        },
    };
});

export const EditPanel = () => {
    return (
        <Menu
            fixed="bottom"
            inverted
            fluid
        >
            <Tab
                style={{
                    width:"100%"
                }}
                menu={{
                    attached:"bottom", 
                    inverted:true, 
                    className:"fluid"
                }}
                renderActiveOnly={false}
                panes={tabs}
            >
            </Tab>
        </Menu>
    );
};
