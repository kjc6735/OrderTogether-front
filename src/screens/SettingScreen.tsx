import React, {useCallback} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setToken} from '../api';
import Inform from '../components/Inform';
import {useUserState} from '../contexts/UserContext';
import userStorage from '../storages/userStorage';
const SettingScreen = () => {
  const [user, setUser] = useUserState();
  const onPress = useCallback(
    e => {
      Inform({
        title: '알림',
        message: '로그아웃 하시겠습니까?',
        objArr: [
          {
            text: '확인',
            onPress: async () => {
              setUser(null);
              setToken(null);
              await userStorage().clear();
            },
          },
          {
            text: '취소',
            onPress: () => {},
          },
        ],
      });
    },
    [setUser],
  );
  return (
    <SafeAreaView>
      <Pressable onPress={onPress}>
        <Text>로그아웃</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingScreen;
