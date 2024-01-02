'use client';

import React, { createContext, Dispatch, useReducer } from 'react';
import { localStorageKey } from '@/constants';

type ActionType = {
  type: string;
  payload?: User;
};

const initialState: User = {
  displayName: '',
  email: '',
  photoURL: '',
  loggedIn: false,
};

const reducer = (state: User, action: ActionType) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    case 'LOGOUT':
      localStorage.removeItem(localStorageKey);
      return {
        ...state,
        displayName: '',
        email: '',
        photoURL: '',
        loggedIn: false,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: User;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });
export const OwerlayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
