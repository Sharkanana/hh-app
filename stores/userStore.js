/**
 * User store
 */
import React, {createContext, useReducer} from 'react';

const initialState = {};
const userStore = createContext(initialState);
const { Provider } = userStore;

const UserProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {

    switch(action.type) {
      case 'setuser':
        return action.user;
      case 'logout':
        return {};
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { userStore, UserProvider }