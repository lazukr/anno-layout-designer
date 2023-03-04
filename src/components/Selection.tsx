import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Image from "react-bootstrap/Image";
import Path from "path-browserify";
import { SelectionData } from "../data/Selection";
import { Button, ButtonGroup, Dropdown, DropdownButton, SplitButton } from "react-bootstrap";

import "../styles/button.scss";

interface SelectionProps {
    name: string;
    defaultValue: string;
    items: SelectionData[];
    setSelect: (select: string) => void;
};

const getImage = (size: number, path: string) => {
    return (
        <Image
            width={size}
            height={size}
            src={Path.join(process.env.PUBLIC_URL, path)}
        />
    );
};

const getDropdownToggle = (selections: SelectionData[], setSelect: (value: string) => void) => {
    return selections.map(child => {
        if (!child.children || child.children!.length === 0) {
            return (
                <Dropdown.Item
                    className="custom-dropdown-item"
                    key={child.id}
                    id={`radio-${child.id}`}
                    variant="dark"
                    value={child.id}
                    eventKey={child.id}
                >
                    {getImage(32, child.imagePath)}
                </Dropdown.Item>
            );
        } else {
            return (
                <SplitButton
                    className="custom-dropdown-horizontal"
                    key={child.id}
                    id={`radio-${child.id}`}
                    onClick={() => setSelect(child.id)}
                    onSelect={e => setSelect(e!)}
                    variant="dark"
                    drop="end"
                    title={getImage(32, child.imagePath)}
                >
                    {getDropdownToggle(child.children!, setSelect)}
                </SplitButton>
            )
        }        
    });
}

export const Selection = ({
    name,
    defaultValue,
    items,
    setSelect,
}: SelectionProps) => {
    return (
        <ToggleButtonGroup
            name={name}
            value={defaultValue}
            size="lg"
            type="radio"
            onChange={value => setSelect(value)
            }
        >
            {items.map(item => {
                    return (
                        <ToggleButton
                            className="d-flex align-items-center"
                            key={item.id}
                            id={`${name}-radio-${item.id}`} 
                            value={item.id} 
                            variant="dark"
                            title={item.name}
                        >
                            {getImage(32, item.imagePath)}
                        </ToggleButton>
                    );
            })} 
        </ToggleButtonGroup>
    );
}

export const ButtonSelection = ({
    name,
    items,
    setSelect,
}: SelectionProps) => {
    return (
        <ButtonGroup
            size="lg"
        >
            {items.map(item => {
                if (!item.children || item.children!.length === 0) {
                    return (
                        <Button
                            className="d-flex align-items-center"
                            key={item.id}
                            id={`${name}-radio-${item.id}`} 
                            value={item.id} 
                            variant="dark"
                            title={item.name}
                            onClick={e => setSelect(item.id)}
                        >
                            {getImage(32, item.imagePath)}
                        </Button>
                    );
                }
                else {
                    return (
                    <SplitButton
                        className="custom-dropdown-toggle"
                        key={item.id}
                        id={`${name}-radio-${item.id}`}
                        onClick={() => setSelect(item.id)}
                        onSelect={e => setSelect(e!)}
                        variant="dark"
                        title={getImage(32, item.imagePath)}
                    >
                        {getDropdownToggle(item.children!, setSelect)}
                    </SplitButton>);
                }
            })}
        </ButtonGroup>
    );
}