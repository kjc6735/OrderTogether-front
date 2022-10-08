import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {useQuery} from 'react-query';
import {getAllPosts, getCategory, getPosts} from '../api';
import {Post} from '../api/types';
import CustomMarker from '../components/CustomMarker';
import PositionList from '../components/PostList';
import {useLocationState} from '../contexts/LocationContext';
import {useUserState} from '../contexts/UserContext';
import useGetMyLocationEffect from '../effects/useLocationEffect';
import usePost from '../hooks/usePost';
import {MainTabParamList} from './types';

function MyMap() {
  const {data: posts} = useQuery('posts', getAllPosts);
  const [select, setSelect] = useState<number>(1);
  const onPress = useCallback(
    (id: number) => {
      setSelect(id);
    },
    [setSelect],
  );
  const [location] = useLocationState();
  const [user] = useUserState();
  const navigation = useNavigation<MainTabParamList>();
  const [center, setCenter] = useState<{
    latitude: number;
    longitude: number;
  } | null>();

  useEffect(() => {
    if (user) {
      setCenter({
        latitude: user.latitude,
        longitude: user.longitude,
      });
    }
  }, [user]);

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
      }}>
      {posts
        ? posts.map((post: Post) => (
            <Marker
              zIndex={post.id === select ? 999 : undefined}
              pinColor={post.id === select ? '#00f' : undefined}
              key={post.id}
              coordinate={{
                latitude: post.latitude,
                longitude: post.longitude,
              }}
              onClick={() => onPress(post.id)}
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
    </NaverMapView>
  );
}

function HomeScreen() {
  const {data: category, isLoading: categoryLoading} = useQuery(
    'category',
    getCategory,
  );
  const {data: posts, isLoading: postsLoading} = useQuery('posts', getAllPosts);
  const [location] = useLocationState();
  const [user] = useUserState();

  useGetMyLocationEffect();

  const isLoading = categoryLoading && postsLoading;
  if (isLoading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <MyMap />
        <PositionList />
      </View>
    );
  }
}

export default HomeScreen;
