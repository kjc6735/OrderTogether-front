import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainTabParamList = {
  Home: undefined;
  Setting: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ILocation = {
  latitude: number;
  longitude: number;
};
