import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useUserState} from './src/contexts/UserContext';
import useLoginEffect from './src/effects/useLoginEffect';
import MainTab from './src/screens/MainTab';
import RootStack from './src/screens/RootStack';

function InApp() {
  // const [user] = useUserState();
  // useLoginEffect();
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  //       .then(result => {
  //         console.log('check location', result);
  //         if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
  //           console.log('android app location always error');

  //           Alert.alert(
  //             '이 앱은 위치 권한 허용이 필요합니다.',
  //             '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
  //             [
  //               {
  //                 text: '네',
  //                 onPress: () => Linking.openSettings(),
  //               },
  //               {
  //                 text: '아니오',
  //                 onPress: () => console.log('No Pressed'),
  //                 style: 'cancel',
  //               },
  //             ],
  //           );
  //         }
  //       })
  //       .catch(console.error);
  //   } else if (Platform.OS === 'ios') {
  //     check(PERMISSIONS.IOS.LOCATION_ALWAYS)
  //       .then(result => {
  //         if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
  //           console.log('ios app location always error');
  //           Alert.alert(
  //             '이 앱은 백그라운드 위치 권한 허용이 필요합니다.',
  //             '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
  //             [
  //               {
  //                 text: '네',
  //                 onPress: () => Linking.openSettings(),
  //               },
  //               {
  //                 text: '아니오',
  //                 style: 'cancel',
  //               },
  //             ],
  //           );
  //         } else {
  //           console.log('result is ', result);
  //         }
  //       })
  //       .catch(() => {
  //         console.error;
  //       });
  //   }
  // }, []);
  return <RootStack />;
}

export default InApp;
