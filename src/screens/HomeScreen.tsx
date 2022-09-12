import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polygon,
  Polyline,
} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import PositionList from '../components/RegisterList';
import {useUserState} from '../contexts/UserContext';
import Geolocation from 'react-native-geolocation-service';

type ILocation = {
  latitude: number;
  longitude: number;
};

function MyMap() {
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};
  const [location, setLocation] = useState<ILocation | null>(null);

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{...P0, zoom: 16}}
      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      <Marker
        coordinate={P0}
        onClick={() => console.warn('onClick! p0')}
        anchor={{x: 15, y: 15}}
        caption={{
          text: 'test',
        }}
      />
    </NaverMapView>
  );
}

function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <MyMap />
      <PositionList />
    </View>
  );
}

export default HomeScreen;
