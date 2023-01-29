import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import {useMutation, useQuery} from 'react-query';
import {getMyPosts, naverGetReverse, removePost} from '../api';
import Inform from '../components/Inform';
import {useUserState} from '../contexts/UserContext';

export default function MyPostsScreen() {
  const {
    data,
    isLoading: postsLoading,
    refetch,
  } = useQuery(['posts', 'myPosts'], getMyPosts);

  const {mutate, isSuccess} = useMutation(removePost, {
    onSuccess: (data: any) => {
      console.log(data);
      Inform({
        title: '알림',
        message: '삭제 성공',
      });
    },
    onError: e => {
      Inform({
        title: '알림',
        message: '삭제 실패',
      });
    },
  });

  const onRemove = useCallback(
    (postId: number) => {
      mutate(postId);
    },
    [mutate],
  );

  useEffect(() => {
    refetch();
  }, [isSuccess, refetch]);
  if (postsLoading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={{backgroundColor: '#fff'}}
      data={data}
      renderItem={({item}) => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            <Text style={{flex: 1}}>{item.title}</Text>

            <TouchableOpacity
              style={{backgroundColor: '#1E6738'}}
              // onPress={() => goChat(item.id)}
              onPress={() => {
                console.log(item.id, item.title);
                mutate(item.id);
              }}>
              <Text style={{color: '#fff', textAlign: 'center', padding: 10}}>
                삭제
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item: any) => item.id}
      ItemSeparatorComponent={() => {
        return (
          <View
            style={{backgroundColor: '#e0e0e0', height: 1, width: '100%'}}
          />
        );
      }}
    />
  );
}
