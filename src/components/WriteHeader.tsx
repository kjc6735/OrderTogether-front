import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function WriteHeader({
  leftButtonPress,
  rightButtonPress,
}: {
  leftButtonPress: () => void;
  rightButtonPress: () => void;
}) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => leftButtonPress()}>
        <Icon
          name="arrow-back"
          size={25}
          color="#4db6ac"
          style={{margin: 10}}
        />
      </TouchableOpacity>
      <Text style={styles.text}>글쓰기</Text>

      <TouchableOpacity activeOpacity={0.8}>
        <Icon
          name="send"
          size={25}
          color="#4db6ac"
          style={{margin: 10}}
          onPress={() => rightButtonPress()}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WriteHeader;
