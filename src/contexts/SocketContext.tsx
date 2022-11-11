import React, {createContext, ReactNode, useContext, useState} from 'react';
import {ILocation} from '../screens/types';

export type SocketContextType = [any | null, (data: any | null) => void];

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketContextProvider({children}: {children: ReactNode}) {
  const socket = useState<any | null>(null);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocketState() {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error('LocationContext Error');
  }

  return state;
}
