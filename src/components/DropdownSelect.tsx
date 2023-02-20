import { useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton, Navbar, NavDropdown, SplitButton, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Path from "path-browserify";
import "../styles/button.scss";
export const DropdownSelect = () => {
    return (
        <ToggleButtonGroup
            name="dream"
            vertical
        >
            <ToggleButton
                name="toggle-test"
                value="test"
            >
                <Image
                    width={32}
                    height={32}
                    src={Path.join(process.env.PUBLIC_URL, "assets/images/1800/farmer/pub.png")}
                />
            </ToggleButton>
            <ToggleButtonGroup
                name="hello"
                as={DropdownButton}
                className="dropdown-btn"
                title=""
                size="sm"
            >
                    <Dropdown.Item as={Button}>
                        <Image
                            width={32}
                            height={32}
                            src={Path.join(process.env.PUBLIC_URL, "assets/images/1800/farmer/pub.png")}
                        />
                    </Dropdown.Item>
            </ToggleButtonGroup>
        </ToggleButtonGroup>        
      );
}