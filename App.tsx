import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import InApp from './InApp';
import {UserContextProvider, useUserState} from './src/contexts/UserContext';
import MainTab from './src/screens/MainTab';
import RootStack from './src/screens/RootStack';

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <InApp />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
export default App;
