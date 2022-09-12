import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useLocationState} from '../contexts/LocationContext';
import {Platform} from 'react-native';

const useLocationEffect = () => {
  const [, setMyLocation] = useLocationState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      currentLocation => {
        setMyLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      },
      e => {
        console.log(Platform.OS, e);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );
  }, [setMyLocation]);
};

export default useLocationEffect;
