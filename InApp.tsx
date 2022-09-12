import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useUserState} from './src/contexts/UserContext';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {RootStackParamList} from './src/screens/types';
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function InApp() {
  const [user] = useUserState();
  // const isLoggedIn = !!user;
  useEffect(() => {
    const pltform = Platform.OS;
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          console.log('check location', result);
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              '이 앱은 위치 권한 허용이 필요합니다.',
              '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
              [
                {
                  text: '네',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: '아니오',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            );
          }
        })
        .catch(console.error);
    } else if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          const isSuccess =
            result !== RESULTS.BLOCKED && result !== RESULTS.DENIED;
          if (!isSuccess) {
            Alert.alert(
              '이 앱은 백그라운드 위치 권한 허용이 필요합니다.',
              '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
              [
                {
                  text: '네',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: '아니오',
                  style: 'cancel',
                },
              ],
            );
          }
        })
        .catch(() => {
          console.log(Platform.OS);
          console.error;
        });
    }
  }, []);
  return true ? (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default InApp;
