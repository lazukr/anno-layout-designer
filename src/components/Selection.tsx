import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Image from "react-bootstrap/Image";
import Path from "path-browserify";
import { ImageNameData } from "../data/ImageNameData";

interface SelectionProps {
    name: string;
    defaultValue: string;
    items: ImageNameData[];
    setSelect: (select: string) => void;
};

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
            onChange={e => setSelect(e)}
        >
            {items.map(item => {
                return (
                    <ToggleButton
                        className="d-flex align-items-center"
                        key={item.name}
                        id={`tbg-radio-${item.name}`} 
                        value={item.name} 
                        variant="dark"
                        title={item.name}
                    >
                        <Image
                            width={32}
                            height={32}
                            src={Path.join(process.env.PUBLIC_URL, item.imagePath)}
                        />
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );

}

