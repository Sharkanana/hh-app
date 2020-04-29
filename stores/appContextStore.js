/**
 * Application context store
 */
import React, {createContext, useReducer} from 'react';

const initialState = {
  spinFn: null,
  user: {}
};
const appContextStore = createContext(initialState);
const { Provider } = appContextStore;

const AppContextProvider = ({ children } ) => {

  const [state, dispatch] = useReducer((state, action) => {

    switch(action.type) {

      case 'init-spin':
        state.spinFn = action.fn;
        return state;

      case 'spin-on':
        if(state.spinFn) {
          state.spinFn(true);
        }
        return state;

      case 'spin-off':
        if(state.spinFn) {
          state.spinFn(false);
        }
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