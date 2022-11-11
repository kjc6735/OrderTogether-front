import React from 'react';
import {Text, View} from 'react-native';

export default function MessageBox() {
  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 5,
      }}>
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 5,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>title</Text>
        <Text style={{fontSize: 20}}>title</Text>
      </View>
    </View>
  );
}
