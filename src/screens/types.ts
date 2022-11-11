import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type RootStackParamList = {
  Chat: {
    title: string;
    data: any;
  };
  Login: undefined;
  Register: undefined;
  MainTab: undefined;
  AddressReset: undefined;
  Write: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Setting: undefined;
  ChatList: undefined;
  MyPosts: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;

export type ILocation = {
  latitude: number;
  longitude: number;
};
