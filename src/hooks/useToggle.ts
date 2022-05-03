import { useCallback, useState } from "react";

export const useToggle = (initValue: boolean = false): [boolean, () => void] => {
    const [value, setValue] = useState(initValue);
    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);

    return [value, toggle];
}