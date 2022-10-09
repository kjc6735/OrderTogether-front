import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, Touchable, View, ViewBase} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import WriteScreen from './WriteScreen';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Setting" component={SettingScreen} options={{}} />
      <Tab.Screen
        name="Write"
        component={WriteScreen}
        options={{
          title: '글쓰기',
          headerRight: () => {
            return (
              <View style={{}}>
                <Icon
                  name="md-send"
                  size={25}
                  color="#f00"
                  style={{margin: 10}}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
