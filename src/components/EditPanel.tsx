import { Menu, Tab } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";

const tabs = [
    {
        menuItem: "Farmers",
        pane: {
            key: "farmer",
            content: "Farmers 1",
            inverted: true,
        }
    },
    {
        menuItem: "Workers",
        pane: {
            key: "worker",
            content: "Workers 1",
            inverted: true,
        }
    },
    {
        menuItem: "Artisans",
        pane: {
            key: "artisan",
            content: "Artisans 1",
            inverted: true,
        }
    },
    {
        menuItem: "Engineers",
        pane: {
            key: "engineers",
            content: "Engineers 1",
            inverted: true,
        }
    },
    {
        menuItem: "Investors",
        pane: {
            key: "investors",
            content: "Investors 1",
            inverted: true,
        }
    }
];

export const EditPanel = () => {
    return (
        <Menu
            fixed="bottom"
            inverted
            fluid
        >
            <Tab
                style={{width:"100%"}}
                menu={{attached:"bottom", inverted:true, className:"fluid"}}
                renderActiveOnly={false}
                panes={tabs}
            >
            </Tab>
        </Menu>
    );
};
