import React, {createContext, ReactNode, useContext, useState} from 'react';
import {ILocation} from '../screens/types';

export type LocationContextType = [
  ILocation | null,
  (data: ILocation | null) => void,
];

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationContextProvider({children}: {children: ReactNode}) {
  const location = useState<ILocation | null>(null);
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationState() {
  const state = useContext(LocationContext);
  if (!state) {
    throw new Error('LocationContext Error');
  }

  return state;
}
