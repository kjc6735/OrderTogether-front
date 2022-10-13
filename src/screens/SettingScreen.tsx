import Postcode from '@actbase/react-daum-postcode';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setToken} from '../api';
import Inform from '../components/Inform';
import {useUserState} from '../contexts/UserContext';
import userStorage from '../storages/userStorage';
const SettingScreen = () => {
  const [addr, setAddr] = useState();
  const [showPostcode, setShowPostcode] = useState(false);
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
      <KeyboardAvoidingView>
        {showPostcode ? (
          <Postcode
            style={styles.postcode}
            jsOptions={{animation: true}}
            onSelected={data => {
              const {zonecode, address, addressEnglish} = data;
              setAddr({
                zonecode: `${zonecode}`,
                address,
                addressEn: addressEnglish,
              });
              setShowPostcode(false);
            }}
            onError={function (error: unknown): void {
              throw new Error('Function not implemented.');
            }}
          />
        ) : (
          <View>
            <Pressable onPress={onPress}>
              <Text>로그아웃</Text>
            </Pressable>
            <Pressable onPress={() => setShowPostcode(true)}>
              <Text>주소지</Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  avoidingView: {
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

/**
 *

export default function RegisterScreen() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPostcodePage, setShowPostcodePage] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [addr, setAddr] = useState<{
    zonecode: string;
    address: string;
    addressEn: string;
    detail?: string | null;
  } | null>();

  const {mutate, isLoading, isSuccess} = useRegister();

  const initialize = useCallback(() => {
    setId('');
    setId('');
    setDisplayName('');
    setAddr(null);
    setPassword('');
  }, []);
  const onSubmit = useCallback(() => {
    if (!id || !password || !addr) {
      Inform({title: '알림', message: '모든 정보를 입력해주세요..'});
    }
    if (addr) {
      mutate({
        displayName,
        userId: id,
        password,
        addressKo: addr.address,
        zonecode: addr.zonecode,
        detail: addr.detail ?? null,
        addressEn: addr.addressEn,
      });
    }
  }, [addr, id, password, displayName, mutate]);

  useEffect(() => {
    isSuccess ? initialize() : '';
  }, [isSuccess, initialize]);

  useEffect(() => {
    console.log(addr);
  }, [addr]);
  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'padding'})}>
      {showPostcodePage ? (
        <Postcode
          style={styles.postcode}
          jsOptions={{animation: true}}
          onSelected={data => {
            const {zonecode, address, addressEnglish} = data;
            setAddr({
              zonecode: `${zonecode}`,
              address,
              addressEn: addressEnglish,
            });
            setShowPostcodePage(!showPostcodePage);
          }}
          onError={function (error: unknown): void {
            throw new Error('Function not implemented.');
          }}
        />
      ) : (
        <View style={styles.block}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="id"
              autoCapitalize="none"
              value={id}
              onChangeText={setId}
            />
            <TextInput
              style={styles.input}
              placeholder="닉네임"
              autoCapitalize="none"
              value={displayName}
              onChangeText={setDisplayName}
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Zonecode"
                style={[styles.input, styles.addressInput, styles.disabled]}
                editable={false}
                selectTextOnFocus={false}
                value={addr?.zonecode}
              />
              <Pressable
                style={({pressed}) => [
                  styles.submit,
                  Platform.OS === 'ios' && pressed && styles.submitPressed,
                  styles.addressSearchButton,
                ]}
                onPress={() => {
                  setShowPostcodePage(!showPostcodePage);
                }}>
                <Text>검색</Text>
              </Pressable>
            </View>
            <TextInput
              style={[styles.input, styles.disabled]}
              placeholder="주소"
              editable={false}
              selectTextOnFocus={false}
              value={addr?.address}
            />
            <TextInput
              style={[styles.input]}
              placeholder="상세주소"
              value={addr?.detail}
              onChangeText={text => setAddr({...addr, detail: text})}
            />
            <Pressable
              style={({pressed}) => [
                styles.submit,
                Platform.OS === 'ios' && pressed && styles.submitPressed,
              ]}
              disabled={isLoading}
              onPress={onSubmit}>
              <Text>회원가입</Text>
            </Pressable>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  submit: {
    backgroundColor: '#FFC107',
    color: '#FFF',
    fontSize: 25,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitPressed: {
    opacity: 0.75,
  },
  addressSearchButton: {
    flex: 1,
  },
  disabled: {
    backgroundColor: '#ddd',
  },
  addressInput: {
    flex: 2,
    marginRight: 10,
  },
  postcode: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    zIndex: 999,
    display: 'flex',
  },
});

 */
