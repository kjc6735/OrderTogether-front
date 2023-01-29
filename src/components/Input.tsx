import {TextInput} from '@react-native-material/core';
import React from 'react';
import {StyleSheet} from 'react-native';

const Input = ({}) => {
  return (
    <TextInput
      style={[styles.input, styles.flex]}
      placeholderTextColor={'#bbb'}
      placeholder="휴대폰 번호를 입력해주세요 (숫자만)"
      autoCapitalize="none"
    />
    //   onFocus={e => {
    //     currentRef.current = 3;
    //   }}
  );
};

const styles = StyleSheet.create({
  flex: {},
  input: {
    borderRadius: 3,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    fontSize: 15,
    fontWeight: '300',
  },
});

export default Input;
