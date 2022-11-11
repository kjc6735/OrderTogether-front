import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, Touchable, View, ViewBase} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatListScreen from './ChatListScreen';
import HomeScreen from './HomeScreen';
import MyPostsScreen from './MyPosts';
import SettingScreen from './SettingScreen';
import {MainTabParamList} from './types';
import WriteScreen from './WriteScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{title: '채팅 리스트'}}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{title: '세팅'}}
      />
      <Tab.Screen name="MyPosts" component={MyPostsScreen} />
    </Tab.Navigator>
  );
}
