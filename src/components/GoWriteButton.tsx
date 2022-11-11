import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import {RootStackNavigationProp} from '../screens/types';

export default function GoWriteButton() {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => navigation.navigate('Write')}
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && {opacity: pressed ? 0.6 : 1},
        ]}
        android_ripple={{color: 'white'}}>
        <Text style={styles.text}>Go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,

    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
