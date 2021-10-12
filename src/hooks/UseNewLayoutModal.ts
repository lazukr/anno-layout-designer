import { useState, Dispatch, SetStateAction } from "react";
import { 
    MINIMUM_GRID_DIMENSION, 
    MAXIMUM_GRID_DIMENSION, 
    DEFAULT_GRID_DIMENSION 
} from "../Constants";

export interface NewLayoutModalProps {
    setBoardWidth: Dispatch<SetStateAction<number>>;
    setBoardHeight: Dispatch<SetStateAction<number>>;
};

const isValidDimensionSize = (dimension: number): boolean => {
    if (isNaN(dimension) ||
        dimension < MINIMUM_GRID_DIMENSION ||
        dimension > MAXIMUM_GRID_DIMENSION) 
    {
        return false;
    }
    return true;
}

export const useNewLayoutModal = (props: NewLayoutModalProps) => {
    const {
        setBoardHeight,
        setBoardWidth,
    } = props;

    const [open, setOpen] = useState(false);
    const [valid, setValid] = useState(true);
    const [height, setHeight] = useState(DEFAULT_GRID_DIMENSION);
    const [width, setWidth] = useState(DEFAULT_GRID_DIMENSION);


    const onCreateNew = (): void => {
        if ( ! isValidDimensionSize(height) ||
             ! isValidDimensionSize(width)) 
        {
            setValid(false);
            setOpen(true);
            return;
        }

        setBoardHeight(height);
        setBoardWidth(width);
        setValid(true);
        setOpen(false);
    };

    const onOpen = (): void => {
        setOpen(true);
        setValid(true);
        setWidth(DEFAULT_GRID_DIMENSION);
        setHeight(DEFAULT_GRID_DIMENSION);
    }

    const onClose = (): void => {
        setOpen(false);
    }

    return {
        open,
        valid,
        height,
        width,
        setHeight,
        setWidth,
        onCreateNew,
        onOpen,
        onClose,
    };
}