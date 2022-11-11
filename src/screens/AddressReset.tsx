import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import {useMutation} from 'react-query';
import {naverGetReverse} from '../api';
import {useUserState} from '../contexts/UserContext';

export default function AddressReset() {
  const [user, setUser] = useUserState();
  const [location, setloaction] = useState<any>();
  const [addr, setAddr] = useState<any>();

  const {mutate} = useMutation(naverGetReverse, {
    onSuccess: data => {
      console.log(data);
    },
    onError: e => {
      console.log(e.response.data);
    },
  });
  useLayoutEffect(() => {
    setloaction({
      longitude: user!.longitude,
      latitude: user!.latitude,
    });
  }, [user]);
  if (!location) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{longitude: user!.longitude, latitude: user!.latitude, zoom: 16}}
      //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      //   onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      //   onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      onMapClick={e => {
        console.log(e);
        setloaction({
          longitude: e.longitude,
          latitude: e.latitude,
        });
        console.log('location : ', location);
        mutate({latitude: location.latitude, longitude: location.longitude});
      }}>
      <Marker
        coordinate={{
          longitude: location.longitude,
          latitude: location.latitude,
        }}
        onClick={() => console.warn('onClick! p0')}
      />
    </NaverMapView>
  );
}
