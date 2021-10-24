import { Menu, Tab, Grid, Image, Button } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import PopData from "../pop_data.json";
import FarmerData from "../data/Farmers.json";
import { CellCursor } from "../hooks/useBoardCursor";
import { Dimension } from "../Board";

interface Building {
    name: string,
    image: string,
    dimension: Dimension,
};

type Dict = {
    [index: string]: Building[]
};

const createBuildingList = (highlighter: (props: CellCursor) => void) => {
    return (list: Building[]) => {
        return (
            <Grid centered>
                {list.map(building => (
                    <Button.Group>
                        <Button
                            key={building.name}
                            basic
                            onClick={() => highlighter({
                                name: building.name,
                                dimension: building.dimension,
                            })}
                        >
                        <Image src={`${process.env.PUBLIC_URL}/assets/images/${building.image}`} />
                        </Button>
                    </Button.Group>
                ))}
            </Grid>
        )
    }
};

const data: Dict = {
    "Farmers": FarmerData.buildings,
};

const getTabs = (tabCreator: (list: Building[]) => JSX.Element) => {
    return PopData.map(item => {
        return {
            menuItem: item.key,
            pane: {
                key: item.key,
                content: data[item.key] ? tabCreator(data[item.key]) : item.content,
                inverted: true,
            },
        };
    });
};

export interface EditPanelProps {
    setSelectedBuilding: (props: CellCursor) => void
};

export const EditPanel = (props: EditPanelProps) => {
    const buildingList = createBuildingList(props.setSelectedBuilding);
    const tabs = getTabs(buildingList);

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
