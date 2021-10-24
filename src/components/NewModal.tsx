import React, { useState } from "react";
import { Input, Label, Button, Icon, Segment } from "semantic-ui-react";
import { CustomModal } from "./CustomModal";
import {
    MINIMUM_GRID_DIMENSION, 
    MAXIMUM_GRID_DIMENSION,
    DEFAULT_GRID_DIMENSION,
} from "../Constants";
import { Dimension } from "../Board";

const isValidDimension = (value: number) => {
    if (isNaN(value) ||
        value < MINIMUM_GRID_DIMENSION ||
        value > MAXIMUM_GRID_DIMENSION) {
        return false;
    }
    return true;
};

export type NewModalProps = {
    setDimension: (dimension: Dimension) => void;
};

export const NewModal = (props: NewModalProps) => {
    const [localWidth, setLocalWidth] = useState(DEFAULT_GRID_DIMENSION);
    const [localHeight, setLocalHeight] = useState(DEFAULT_GRID_DIMENSION);
    const [valid, setValid] = useState(true);

    const onChange = (value: number, updater: React.Dispatch<React.SetStateAction<number>>) => {
        if (! (isValidDimension(value))) {
            setValid(false);
            return;
        }
        updater(value);
        setValid(true);
    };

    const onSubmit = () => {
        props.setDimension(new Dimension(localWidth, localHeight));
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
            <Segment 
                className="basic"
                textAlign="center"
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
            </Segment>
        </CustomModal>
    );
};