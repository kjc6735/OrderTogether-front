import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Write: undefined;
  Chatting: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Setting: undefined;
  ChatList: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;

export type ILocation = {
  latitude: number;
  longitude: number;
};
