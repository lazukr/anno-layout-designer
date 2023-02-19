import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Image from "react-bootstrap/Image";
import Path from "path-browserify";
import { SelectionData } from "../data/ImageNameData";
import { Dropdown, SplitButton } from "react-bootstrap";

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
                        className="d-flex align-items-center"
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

                if (!item.children || item.children!.length === 0) {
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
                }
                else {
                    return (
                    <SplitButton
                        as={ToggleButton}
                        className="d-flex align-items-center"
                        key={item.id}
                        id={`${name}-radio-${item.id}`}
                        onClick={() => setSelect(item.id)}
                        onSelect={e => setSelect(e!)}
                        variant="dark"
                        size="sm"
                        navbar
                        title={getImage(32, item.imagePath)}
                    >
                        <Dropdown.Menu variant="dark">
                            {getDropdownToggle(item.children!, setSelect)}
                        </Dropdown.Menu>
                    </SplitButton>);
                }
            })}
        </ToggleButtonGroup>
    );
}

