import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

export const Global = props => {
  return(
    <GlobalContext.Provider value={useReducer(props.reducer, props.state)}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalValue = () => useContext(GlobalContext);