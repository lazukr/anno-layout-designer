import { useState } from "react";

export const useToggle = (initialToggle: boolean = false) => {
    const [toggled, setToggled] = useState(initialToggle);
    
    const toggle = () => { setToggled(v => !v)};
    return [toggled, toggle] as const;
};