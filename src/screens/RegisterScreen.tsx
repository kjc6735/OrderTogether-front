import Postcode from '@actbase/react-daum-postcode';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Inform from '../components/Inform';
import {useRegister} from '../hooks/useRegister';

export default function RegisterScreen() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPostcodePage, setShowPostcodePage] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [addr, setAddr] = useState<{
    zonecode: number;
    address: string;
    addressEn: string;
    detail?: string;
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
              zonecode: zonecode,
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
                value={addr?.zonecode.toString()}
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
              onChangeText={(text: string) => setAddr({...addr!, detail: text})}
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
