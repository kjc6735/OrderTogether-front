import {CommonActions, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, TouchableOpacity, View} from 'react-native';
import {useUserState} from '../contexts/UserContext';
import AddressReset from './AddressReset';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
import LoginScreen from './LoginScreen';
import MainTab from './MainTab';
import RegisterScreen from './RegisterScreen';
import {RootStackParamList} from './types';
import WriteScreen from './WriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MyPostsScreen from './MyPosts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [user] = useUserState();
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          // headerTitle: '',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: '회원가입',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => {
          // console.log('route ', route.params.title);
          return {
            title: route.params.title,
            room: route.params.room.name,
            headerLeft: () => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon
                    name="arrow-back"
                    size={25}
                    color="#4db6ac"
                    style={{margin: 10}}
                  />
                </TouchableOpacity>
              );
            },
          };
        }}
      />
      <Stack.Screen name="AddressReset" component={AddressReset} />
    </Stack.Navigator>
  );
}
