/**
 * Application context store
 */
import React, {createContext, useReducer} from 'react';

const initialState = {
  spinning: null,
  user: {}
};
const appContextStore = createContext(initialState);
const { Provider } = appContextStore;

const AppContextProvider = ({ children } ) => {

  // setting up spinning state for global spinner
  const [spinning, updateSpinning] = React.useState(false);
  initialState.spinning = spinning;

  const [state, dispatch] = useReducer((state, action) => {

    switch(action.type) {

      case 'spin-on':
        updateSpinning(true);
        return state;

      case 'spin-off':
        updateSpinning(false);
        return state;

      case 'set-user':
        state.user = action.user;
        return state;

      case 'logout':
        state.user = {};
        return state;

      default:
        throw new Error(`Invalid dispatch value for AppContextProvider: ${action.type}`);
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { appContextStore, AppContextProvider };