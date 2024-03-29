import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {getAllPosts} from '../api';
import {Post} from '../api/types';
import {MainTabNavigationProp, RootStackNavigationProp} from '../screens/types';
import Inform from './Inform';

const PositionList = ({
  posts,
  select,
  onPress,
  moveTo,
  goChat,
}: {
  posts: Post[] | null;
  select: Post | null;
  onPress: (data: any) => void;
  moveTo: (data: any) => void;
  goChat: (postId: number) => Promise<void>;
}) => {
  const navigation = useNavigation<MainTabNavigationProp>();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: '#f2f2f2',
          height: '100%',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <FlatList
          style={{backgroundColor: '#fff'}}
          data={posts}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: select?.id === item.id ? '#e4e4e4' : '#fff',
                padding: 10,
              }}>
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                key={item.id}
                onPress={() => {
                  onPress(item.id);
                  moveTo({latitude: item.latitude, longitude: item.longitude});
                }}>
                <Text style={{fontSize: 20}}>{item.title}</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    style={{backgroundColor: '#1E6738'}}
                    // onPress={() => goChat(item.id)}
                    onPress={() =>
                      Inform({
                        title: item.title,
                        message: item.describe,
                        objArr: [
                          {
                            text: '대화하기',
                            onPress: async () => await goChat(item.id),
                          },
                          {
                            text: '취소',
                            onPress: () => {},
                          },
                        ],
                      })
                    }>
                    <Text
                      style={{color: '#fff', textAlign: 'center', padding: 10}}>
                      내용보기
                    </Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
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
      </View>
    </View>
  );
};

export default PositionList;
