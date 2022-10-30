import {useNavigation} from '@react-navigation/native';
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
import usePost from '../hooks/usePostTemp';
import {MainTabParamList, RootStackNavigationProp} from './types';

function HomeScreen() {
  const {data: category, isLoading: categoryLoading} = useQuery(
    'category',
    getCategory,
  );

  const navigation = useNavigation<RootStackNavigationProp>();

  const [user] = useUserState();
  const [selectedStore, setSeletedStore] = useState(null);

  const {data: posts, isLoading: postsLoading} = useQuery(
    ['posts', selectedStore],
    ({queryKey}) => {
      console.log(queryKey);
      return queryKey[1] ? getPostsByStoreId(queryKey[1]) : getAllPosts();
    },
    {
      onError: (e: AxiosError) => {
        console.log(e.response);
      },
      onSuccess: data => {
        console.log(data);
      },
    },
  );

  const [filteredPost, setFilterdPost] = useState();
  const [select, setSelect] = useState<Post | null>(null);

  const onPress = useCallback(
    (id: number) => {
      setSelect(posts.filter((post: Post) => post.id === id)[0]);
    },
    [setSelect, posts],
  );
  const nmapRef = useRef<any>();

  const goChat = useCallback(
    (postId: number) => {
      navigation.navigate('Chat');
    },
    [navigation],
  );

  useEffect(() => {
    posts && setFilterdPost(posts);
  }, [posts]);

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

  const isLoading = categoryLoading || postsLoading;
  if (isLoading || !nmapRef.current) {
    <View>
      <Text>loading...</Text>
    </View>;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      {user && nmapRef.current && (
        <NaverMapView
          ref={ref => (nmapRef.current = ref)}
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={true}
          center={{
            zoom: 15,
            latitude: user.latitude,
            longitude: user.longitude,
          }}>
          <SelectCategory onChange={setSeletedStore} value={selectedStore} />
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
                  }}
                />
              ))
            : null}
        </NaverMapView>
      )}
      <PositionList
        goChat={goChat}
        posts={posts}
        onPress={onPress}
        select={select}
        moveTo={nmapRef.current?.animateToCoordinate}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
