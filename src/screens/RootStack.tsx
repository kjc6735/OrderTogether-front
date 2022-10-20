import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useUserState} from '../contexts/UserContext';
import ChatListScreen from './ChatListScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [user] = useUserState();

  return (
    <Stack.Navigator initialRouteName="Login">
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="ChatList" component={ChatListScreen} />
      )}
    </Stack.Navigator>
  );
}
