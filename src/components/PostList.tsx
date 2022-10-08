import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
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

const PositionList = ({
  select,
  onPress,
  moveTo,
}: {
  select: Post | null;
  onPress: (data: any) => any;
  moveTo: (data: any) => any;
}) => {
  const {data: posts, isLoading: postsLoading} = useQuery('posts', getAllPosts);

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
                backgroundColor: select?.id === item.id ? '#F00' : '#fff',
              }}>
              {/* <Text>{item.id}</Text> */}
              <Pressable
                style={{padding: 16}}
                key={item.id}
                onPress={() => {
                  onPress(item.id);
                  moveTo({latitude: item.latitude, longitude: item.longitude});
                }}>
                <Text style={{backgroundColor: '#fff', fontSize: 20}}>
                  {item.id}
                  {item.title}
                </Text>
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
