import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useUserState} from '../contexts/UserContext';
import ChatListScreen from './ChatListScreen';
import LoginScreen from './LoginScreen';
import MainTab from './MainTab';
import RegisterScreen from './RegisterScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const [user] = useUserState();

  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
    </Stack.Navigator>
  );
}
