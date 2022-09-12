import React from 'react';
import {Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import PositionList from '../components/PostList';
import {useLocationState} from '../contexts/LocationContext';
import useGetMyLocationEffect from '../effects/useLocationEffect';

function MyMap() {
  const [location] = useLocationState();
  useGetMyLocationEffect();
  if (!location) {
    return (
      <View>
        <Text>test</Text>
      </View>
    );
  }

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{
        zoom: 15,
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      <Marker
        coordinate={{latitude: 37.3701906, longitude: 127.9291425}}
        onClick={() => console.warn('onClick! p0')}
      />
      <Marker
        coordinate={{latitude: location.latitude, longitude: location.latitude}}
        onClick={() => console.log(location)}
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
