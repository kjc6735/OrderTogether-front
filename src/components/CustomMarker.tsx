import React from 'react';
import {Marker} from 'react-native-nmap';

const CustomMarker = ({key, onPress, item}: any) => {
  return (
    <Marker
      key={key}
      onPress={() => console.log('test')}
      coordinate={{
        latitude: item.latitude,
        longitude: item.longitude,
      }}
    />
  );
};

export default CustomMarker;
