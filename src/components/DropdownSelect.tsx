import { useState } from "react";
import { Dropdown, DropdownButton, Navbar, NavDropdown, SplitButton, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

export const DropdownSelect = ({}) => {
    const [value, setValue] = useState("test");

    return (
        <>
        <Navbar.Brand>{value}</Navbar.Brand>
        <ToggleButtonGroup
            name="tbg-test-hello-1"
            value={value}
            type="radio"
            size="lg"
            onChange={value => {
                setValue(value);
            }}
        >
            <ToggleButton
                id="tb-1"
                name={"test"}
                value={"test"}
                variant="dark"
                className="d-flex align-items-center"
            >
                test
            </ToggleButton>
            <ToggleButton
                id="tb-2"
                name={"hello"}
                value={"hello"}
                variant="dark"
                className="d-flex align-items-center"
            >
                hello
            </ToggleButton>
            <SplitButton
                as={ToggleButtonGroup}
                id="tb-q"
                title="hello-world"
                variant="dark"
                size="lg"
                drop="down"
                onClick={e => {
                    console.log("hello");
                    setValue("top");
                }}
                onSelect={e => setValue(e!)}
            >
                <Dropdown.Item 
                    as={ToggleButton}
                    id="tb-3"
                    value="action3"
                    variant="dark"
                    eventKey="action3"
                >
                    Action
                </Dropdown.Item>
                <Dropdown.Item 
                    as={ToggleButton}
                    id="tb-4"
                    value="another-action"
                    variant="dark"
                    eventKey="another-action"
                >
                    Another action
                </Dropdown.Item>
                <Dropdown.Item 
                    as={ToggleButton}
                    id="tb-5"
                    value="something-else"
                    variant="dark"
                    eventKey="something-else"
                >
                    Something else
                </Dropdown.Item>
            </SplitButton>
        </ToggleButtonGroup>
        </>
    );
}

/*
"1800_farmer_sawmill": {
    "name": "1800_farmer_sawmill",
    "imagePath": "assets/images/1800/farmer/sawmill.png",
    "width": 3,
    "height": 4,
    "colour": "#ffff80",
    "productionChain": {
        "1800_farmer_sawmill": {
        "name": "1800_farmer_sawmill",
        "imagePath": "assets/images/1800/farmer/sawmill.png",
        "width": 3,
        "height": 4,
        "colour": "#ffff80",
        "productionChain": {
    }
},

Buildings
- SNAP Data
    - ID
    - image
    - width
    - height
    - colour

- Interface Data
    - ID
    - name
    - productionChains

Citizens
- Building Id List

Games
- Citizen Id List

Series
- Game Id List
*/