import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useUserState} from '../contexts/UserContext';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
import LoginScreen from './LoginScreen';
import MainTab from './MainTab';
import RegisterScreen from './RegisterScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [user] = useUserState();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      {/* <Stack.Screen name="ChatList" component={ChatListScreen} /> */}
    </Stack.Navigator>
  );
}
