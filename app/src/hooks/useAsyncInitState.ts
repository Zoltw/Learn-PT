import { useEffect, useState } from 'react';

export const useAsyncInitState = (asyncFunction) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const initializeState = async () => {
      const result = await asyncFunction();
      setState(result);
    };
    initializeState();
  }, [asyncFunction]);

  return state;
};
