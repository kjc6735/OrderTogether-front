export type MainTabParamList = {
  Home: undefined;
  Setting: undefined;
  ChatList: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Write: undefined;
  Chatting: string;
  MainTab: MainTabParamList;
};

// export type RootStackNavigationProp =
//   NativeStackNavigationProp<RootStackParamList>;

export type ILocation = {
  latitude: number;
  longitude: number;
};
