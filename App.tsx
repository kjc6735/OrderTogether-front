import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UserContextProvider} from './src/contexts/UserContext';
import RootStack from './src/screens/RootStack';

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
export default App;
