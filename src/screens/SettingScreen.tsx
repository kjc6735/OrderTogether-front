import Postcode from '@actbase/react-daum-postcode';
import React, {useCallback, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setToken} from '../api';
import Inform from '../components/Inform';
import {useUserState} from '../contexts/UserContext';
import userStorage from '../storages/userStorage';
const SettingScreen = () => {
  const [addr, setAddr] = useState();
  const [showPopup, setShowPopup] = useState(true);
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
    <SafeAreaView style={styles.wrapper}>
      <Pressable onPress={onPress}>
        <Text>로그아웃</Text>
      </Pressable>
      <Pressable onPress={() => setShowPopup(true)}>
        <Text>주소지</Text>
      </Pressable>
      {showPopup && (
        <Postcode
          style={styles.postcode}
          jsOptions={{animation: true}}
          onSelected={data => {
            //const {zonecode, address, addressEnglish} = data;
            // setAddr({
            //   zonecode: `${zonecode}`,
            //   address,
            //   addressEn: addressEnglish,
            // });
            setShowPopup(false);
          }}
          onError={function (error: unknown): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  postcode: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    zIndex: 999,
    display: 'flex',
  },
});

export default SettingScreen;
