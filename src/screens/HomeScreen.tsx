import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import NaverMapView from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserState} from '../contexts/UserContext';

function HomeScreen() {
  const [user] = useUserState();
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <SafeAreaView>
      <NaverMapView style={{flex: 1}} />
    </SafeAreaView>
  );
}

export default HomeScreen;
