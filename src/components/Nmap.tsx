import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getAllPosts, getCategory, getPosts} from '../api';
import {Post} from '../api/types';
import CustomMarker from '../components/CustomMarker';
import PositionList from '../components/PostList';
import SelectCategory from '../components/SelectCategory';
import {useUserState} from '../contexts/UserContext';
import usePost from '../hooks/usePostTemp';
import {MainTabParamList} from './types';

function Nmap({
  select,
  onPress,
}: {
  select: Post | null;

  onPress: (data: any) => any;
}) {
  const {data: posts} = useQuery('posts', getAllPosts);

  const [user] = useUserState();
  const navigation = useNavigation<MainTabParamList>();
  const nmapRef = useRef<any>();

  useEffect(() => {
    nmapRef.current = user
      ? new NaverMapView({
          style: {width: '100%', height: '100%'},
          center: {
            zoom: 15,
            latitude: user.latitude,
            longitude: user.longitude,
          },
        })
      : null;
  }, [user]);
  return user ? (
    <NaverMapView
      ref={ref => (nmapRef.current = ref)}
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{
        zoom: 15,
        latitude: user.latitude,
        longitude: user.longitude,
      }}>
      <Marker
        pinColor="#f0f"
        key={999}
        coordinate={{
          latitude: user.latitude,
          longitude: user.longitude,
        }}
      />
      {posts
        ? posts.map((post: Post) => (
            <Marker
              zIndex={post.id === select?.id ? 999 : undefined}
              pinColor={post.id === select?.id ? '#00f' : undefined}
              key={post.id}
              coordinate={{
                latitude: post.latitude,
                longitude: post.longitude,
              }}
              onClick={() => {
                onPress(post.id);
                nmapRef.current.animateToCoordinate({
                  latitude: select?.latitude,
                  longitude: select?.longitude,
                });
              }}
            />
          ))
        : null}
      {/* <FlatList
          keyExtractor={item => item.id.toString()}
          data={posts}
          renderItem={(post: Post) => (
            <Marker
              zIndex={post.id === select ? 999 : undefined}
              pinColor={post.id === select ? '#00f' : undefined}
              key={post.id.toString()}
              coordinate={{
                latitude: post.latitude,
                longitude: post.longitude,
              }}
              onClick={() => onPress(post.id)}
            />
          )}
          windowSize={2}
        /> */}
      {/* <NaverMapView
            ref={ref => {
              nmapRef.current = ref;
            }}
            style={{width: '100%', height: '100%'}}
            onMapClick={() => {
              // console.log('clicked map');
              // console.log(nmapRef);
              // nmapRef.current.animateToCoordinate({
              //   latitude: user?.latitude,
              //   longitude: user?.longitude,
              // });
            }}
          /> */}
      {/* <MyMap select={select} onPress={onPress} /> */}
    </NaverMapView>
  ) : (
    <View>
      <Text>암것도없음</Text>
    </View>
  );
}
export default Nmap;
