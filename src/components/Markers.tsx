import React from 'react';
import {Marker} from 'react-native-nmap';
import {Post} from '../api/types';

export default function Markers({posts, onPress, select}) {
  return posts?.map((post: Post) => {
    return (
      <Marker
        zIndex={post.id === select?.id ? 999 : 998}
        pinColor={post.id === select?.id ? '#00f' : '#000'}
        key={post.id}
        coordinate={{
          latitude: post.latitude,
          longitude: post.longitude,
        }}
        onClick={() => {
          onPress(post.id);
        }}
      />
    );
  });
}
