import { useEffect, useState } from "react";

export const useDebounce = (value,delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay);

        return () => clearTimeout(timeout)
    },[value, delay]);

    return debouncedValue;
}