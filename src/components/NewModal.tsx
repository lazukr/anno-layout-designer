import React, { SetStateAction, useState, Dispatch } from "react";
import { Input, Label, Button, Icon } from "semantic-ui-react";
import { CustomModal } from "./CustomModal";
import {
    MINIMUM_GRID_DIMENSION, 
    MAXIMUM_GRID_DIMENSION,
    DEFAULT_GRID_DIMENSION,
} from "../Constants";

const isValidDimension = (value: number) => {
    if (isNaN(value) ||
        value < MINIMUM_GRID_DIMENSION ||
        value > MAXIMUM_GRID_DIMENSION) {
        return false;
    }
    return true;
};

export type NewModalProps = {
    setWidth: Dispatch<SetStateAction<number>>;
    setHeight: Dispatch<SetStateAction<number>>;
};

export const NewModal = (props: NewModalProps) => {
    const [localWidth, setLocalWidth] = useState(DEFAULT_GRID_DIMENSION);
    const [localHeight, setLocalHeight] = useState(DEFAULT_GRID_DIMENSION);
    const [valid, setValid] = useState(true);

    const {
        setWidth,
        setHeight,
    } = props;

    const onChange = (value: number, updater: React.Dispatch<React.SetStateAction<number>>) => {
        if (! (isValidDimension(value))) {
            setValid(false);
            return;
        }
        updater(value);
        setValid(true);
    };

    const onSubmit = () => {
        setWidth(localWidth);
        setHeight(localHeight);
    };

    return (
        <CustomModal
            header="New Layout"
            trigger={
                <Button secondary>
                    <Icon name="file" />
                    New
                </Button>
            }
            valid={valid}
            submitButton={{
                submitContent:"Create",
                submitIcon:"plus",
                hideSubmit:false,
                onSubmit:onSubmit,
            }}
        >
            <Input
                className="large"
                label="Width:"
                type="number"
                min={MINIMUM_GRID_DIMENSION}
                max={MAXIMUM_GRID_DIMENSION}
                defaultValue={localWidth}
                onChange={e => onChange(e.target.valueAsNumber, setLocalWidth)}
                required
            >
            </Input>
            <Input
                className="large"
                label="Height:"
                type="number"
                min={MINIMUM_GRID_DIMENSION}
                max={MAXIMUM_GRID_DIMENSION}
                defaultValue={localHeight}
                onChange={e => onChange(e.target.valueAsNumber, setLocalHeight)}
                required
            >
            </Input>
            <Label
                className={`red basic ${valid ? "hidden" : "visible"}`}
            >
                {`Minimum value is ${MINIMUM_GRID_DIMENSION} and
                Maximum value is ${MAXIMUM_GRID_DIMENSION}`}
            </Label>
        </CustomModal>
    );
};