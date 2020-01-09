import {useState} from 'react';

const useToggle = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const toggle = () => setValue(value => !value);
    return [value, toggle]
}

export default useToggle;