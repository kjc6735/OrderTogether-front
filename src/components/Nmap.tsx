import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

function Nmap() {
  

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{...P0, zoom: 16}}
      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
      <Marker
        coordinate={P1}
        pinColor="blue"
        onClick={() => console.warn('onClick! p1')}
      />
      <Marker
        coordinate={P2}
        pinColor="red"
        onClick={() => console.warn('onClick! p2')}
      />
      <Path
        coordinates={[P0, P1]}
        onClick={() => console.warn('onClick! path')}
        width={10}
      />
      <Polyline
        coordinates={[P1, P2]}
        onClick={() => console.warn('onClick! polyline')}
      />
      <Circle
        coordinate={P0}
        color={'rgba(255,0,0,0.3)'}
        radius={200}
        onClick={() => console.warn('onClick! circle')}
      />
      <Polygon
        coordinates={[P0, P1, P2]}
        color={'rgba(0, 0, 0, 0.5)'}
        onClick={() => console.warn('onClick! polygon')}
      />
    </NaverMapView>
  );
}

export default Nmap;
