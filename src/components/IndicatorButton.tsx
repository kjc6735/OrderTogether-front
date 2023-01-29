import {Text} from '@react-native-material/core';
import React, {ReactComponentElement} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

type IndicatorButtonProps = {
  title: string;
  disabled?: boolean | null | undefined | unknown;
  loading?: boolean | null | undefined | unknown;
  //   indicatorComponent: ReactComponentElement<any> | null | undefined | unknown;
};
const IndicatorButton = ({
  title,
  disabled = null,
  loading = null,
}: IndicatorButtonProps) => {
  return (
    <TouchableOpacity style={[style.touchable]} disabled={!!disabled}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  touchable: {
    backgroundColor: '#fff',
    borderColor: '#7e57c2',
    borderWidth: 1,
    padding: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: '100%',
    color: '#7e57c2',
    borderRadius: 3,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    maxHeight: 20,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text: {
    color: '#7e57c2',
    fontWeight: '400',
    fontSize: 15,
  },
});

export default IndicatorButton;
