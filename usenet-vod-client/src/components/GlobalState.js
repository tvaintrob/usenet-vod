import React, { useState, useContext } from 'react';

export const GlobalStateContext = React.createContext({});

export function GlobalState({ children }) {
  const [state, setState] = useState({});

  return (
    <GlobalStateContext.Provider value={[state, setState]}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState(keyname, defaultValue) {
  const [state, setState] = useContext(GlobalStateContext);
  const setGlobalState = value => setState({ ...state, [keyname]: value });

  return [state[keyname] || defaultValue, setGlobalState];
}
