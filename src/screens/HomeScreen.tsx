import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
//todo address - todo 나누기
import PositionList from '../components/PostList';
import SelectCategory from '../components/SelectCategory';

import Markers from '../components/Markers';
import {useUserState} from '../contexts/UserContext';
import {usePost} from '../hooks/usePost';
import useCategory from '../hooks/useCategory';

function HomeScreen() {
  const [user] = useUserState();
  const [selectedStore, setSeletedStore] = useState(null);
  const nmapRef = useRef<NaverMapView | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const {posts} = usePost(subCategoryId);
  const {categories} = useCategory();
  return (
    <View>
      {categories.data && (
        <SelectCategory onChange={setSeletedStore} value={selectedStore} />
      )}
      <NaverMapView
        ref={ref => (nmapRef.current = ref)}
        style={{width: '100%', height: '100%', zIndex: 0}}
        showsMyLocationButton={true}
        center={{
          zoom: 15,
          latitude: user!.latitude,
          longitude: user!.longitude,
        }}>
        {nmapRef.current && (
          <>
            <Marker
              pinColor="#f0f"
              key={999}
              coordinate={{
                latitude: user!.latitude,
                longitude: user!.longitude,
              }}
            />
            {/* <Markers posts={posts} onPress={onPress} select={select} /> */}
          </>
        )}
      </NaverMapView>

      {/* {!!posts && (
        <PositionList
          // goChat={goChat}
          goChat={async () => {}}
          posts={posts}
          onPress={onPress}
          select={select}
          moveTo={nmapRef.current?.animateToCoordinate}
        />
      )} */}
    </View>
  );
}

export default HomeScreen;
