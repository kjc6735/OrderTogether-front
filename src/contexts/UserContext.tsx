import React, {createContext, ReactNode, useContext, useState} from 'react';
import {User} from '../api/types';

export type UserContextType = [User | null, (data: User | null) => void];

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({children}: {children: ReactNode}) {
  const user = useState<User | null>(null);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserState() {
  const state = useContext(UserContext);
  if (!state) {
    throw new Error('UserContext Error');
  }

  return state;
}
