import { useCallback, useState } from 'react';

type useBooleanType = {
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  state: boolean;
};

const useBoolean = (initialState: boolean = false): useBooleanType => {
  const [open, setOpen] = useState(initialState);

  const setTrue = useCallback(() => setOpen(true), [setOpen]);
  const setFalse = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  return {
    state: open,
    setTrue,
    setFalse,
    toggle,
  };
};

export { useBoolean };
