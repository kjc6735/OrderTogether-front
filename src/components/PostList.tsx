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

type PositionListProps = {
  data: null | string;
};

const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};
const data = [
  {
    id: 1,
    category: '치킨',
    latitude: P0.latitude,
    longitude: P0.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 2,
    category: '치킨',
    latitude: P1.latitude,
    longitude: P1.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 3,
    category: '치킨',
    latitude: P2.latitude,
    longitude: P2.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 4,
    category: '치킨',
    latitude: P0.latitude,
    longitude: P0.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 5,
    category: '치킨',
    latitude: P1.latitude,
    longitude: P1.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 6,
    category: '치킨',
    latitude: P2.latitude,
    longitude: P2.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 7,
    category: '치킨',
    latitude: P0.latitude,
    longitude: P0.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 8,
    category: '치킨',
    latitude: P1.latitude,
    longitude: P1.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 9,
    category: '치킨',
    latitude: P2.latitude,
    longitude: P2.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 10,
    category: '치킨',
    latitude: P0.latitude,
    longitude: P0.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 11,
    category: '치킨',
    latitude: P1.latitude,
    longitude: P1.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
  {
    id: 12,
    category: '치킨',
    latitude: P2.latitude,
    longitude: P2.longitude,
    describe: '지담치킨 먹을사람 ~~',
  },
];

const PositionList = () => {
  const onPress = useCallback(id => {
    console.log(id);
  }, []);
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
          data={data}
          renderItem={({item}) => (
            <View style={{backgroundColor: '#fff'}}>
              {/* <Text>{item.id}</Text> */}
              <Pressable
                style={{padding: 16}}
                key={item.id}
                onPress={() => onPress(item.id)}>
                <Text style={{backgroundColor: '#fff', fontSize: 20}}>
                  {item.describe}
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

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
  },
});

export default PositionList;
