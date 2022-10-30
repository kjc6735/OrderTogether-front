import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, Touchable, View, ViewBase} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
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
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name="Setting" component={SettingScreen} options={{}} />
      {/* <Tab.Screen
        name="Write"
        component={WriteScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
}
