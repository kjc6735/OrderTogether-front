import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getAllPosts, getCategory, getPosts, getPostsByStoreId} from '../api';
import {Post} from '../api/types';
import PositionList from '../components/PostList';
import SelectCategory from '../components/SelectCategory';
import {useUserState} from '../contexts/UserContext';
import {useChat} from '../hooks/useChat';
import usePost from '../hooks/usePostTemp';
import {DeviceEventEmitter} from 'react-native';

import {
  MainTabNavigationProp,
  MainTabParamList,
  RootStackNavigationProp,
} from './types';
import Markers from '../components/Markers';
import GoWriteButton from '../components/GoWriteButton';
import {useSocketState} from '../contexts/SocketContext';

function HomeScreen() {
  const {data: category, isLoading: categoryLoading} = useQuery(
    'category',
    getCategory,
  );
  const [, setSocket] = useSocketState();
  const isFocused = useIsFocused();
  const navigation = useNavigation<MainTabNavigationProp>();

  const [user] = useUserState();
  const [selectedStore, setSeletedStore] = useState(null);

  const {
    data: posts,
    isLoading: postsLoading,
    refetch,
  } = useQuery(
    ['posts', selectedStore],
    ({queryKey}) => {
      return queryKey[1] ? getPostsByStoreId(queryKey[1]) : getAllPosts();
    },
    {
      onError: (e: AxiosError) => {},
      onSuccess: data => {},
    },
  );
  const {data: chatUser, mutate, isSuccess} = useChat();
  const [filteredPost, setFilterdPost] = useState();
  const [select, setSelect] = useState<Post | null>(null);

  const onPress = useCallback(
    (id: number) => {
      setSelect(posts.filter((post: Post) => post.id === id)[0]);
    },
    [setSelect, posts],
  );
  const nmapRef = useRef<any>();
  const [mapLoading, setMapLoading] = useState(false);
  const goChat = useCallback(
    async (postId: number) => {
      mutate(postId);
    },
    [mutate],
  );

  useEffect(() => {
    posts && setFilterdPost(posts);
  }, [posts]);

  useEffect(() => {
    nmapRef.current = null;
    refetch();
  }, [refetch, isFocused]);
  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);
  const isLoading = categoryLoading || postsLoading;
  if (isLoading && !user) {
    <View>
      <Text>loading...</Text>
    </View>;
  }
  return (
    user && (
      <SafeAreaView style={{flex: 1, position: 'relative'}}>
        <SelectCategory onChange={setSeletedStore} value={selectedStore} />

        <NaverMapView
          ref={ref => {
            return (nmapRef.current = ref);
          }}
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
              <Markers posts={posts} onPress={onPress} select={select} />
            </>
          )}
        </NaverMapView>

        <PositionList
          goChat={goChat}
          posts={posts}
          onPress={onPress}
          select={select}
          moveTo={nmapRef.current?.animateToCoordinate}
        />
      </SafeAreaView>
    )
  );
}

export default HomeScreen;
