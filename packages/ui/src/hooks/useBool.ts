import { useMemo, useState } from 'react';

export const useBool = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  return useMemo(() => {
    const setTrue = () => {
      setValue(true);
    };
    const setFalse = () => {
      setValue(false);
    };
    const toggle = () => {
      setValue((prev) => !prev);
    };
    return { value, set: { true: setTrue, false: setFalse, toggle }, setValue } as const;
  }, [value]);
};
