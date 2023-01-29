import {Button} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useRegister} from '../hooks/useRegister';
import IndicatorButton from '../components/IndicatorButton';

export default function RegisterScreen() {
  const currentRef = useRef<number>(0);
  const refArr = useRef<TextInput[] | null[]>([]);
  const [userId, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const {register, checkDuplicateUserId, phoneAuthentication} = useRegister();
  const nextRef = useCallback((e: any) => {
    currentRef.current++;
    console.log(refArr.current[currentRef.current]?.focus());
    if (currentRef.current === nextRef.length) {
      return;
    }
    refArr.current[currentRef.current]?.focus();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.block}>
      <View style={styles.wrapper}>
        <TextInput
          ref={ref => (refArr.current[0] = ref)}
          style={[styles.input, styles.flex]}
          placeholderTextColor={'#bbb'}
          placeholder="아이디를 입력해주세요"
          autoCapitalize="none"
          onSubmitEditing={nextRef}
          onFocus={e => {
            currentRef.current = 0;
          }}
        />
        <IndicatorButton title="중복확인" disabled={true} />
      </View>
      <View style={styles.wrapper}>
        <TextInput
          ref={ref => (refArr.current[1] = ref)}
          style={[styles.input, styles.flex]}
          placeholderTextColor={'#bbb'}
          placeholder="비밀번호를 입력해주세요"
          autoCapitalize="none"
          onSubmitEditing={nextRef}
          onFocus={e => {
            currentRef.current = 1;
          }}
        />
      </View>
      <View style={styles.wrapper}>
        <TextInput
          ref={ref => (refArr.current[2] = ref)}
          style={[styles.input, styles.flex]}
          placeholderTextColor={'#bbb'}
          placeholder="비밀번호 똑같이 입력해주세요"
          autoCapitalize="none"
          onSubmitEditing={nextRef}
          onFocus={e => {
            currentRef.current = 2;
          }}
        />
      </View>
      <View style={styles.wrapper}>
        <TextInput
          ref={ref => (refArr.current[3] = ref)}
          style={[styles.input, styles.flex]}
          placeholderTextColor={'#bbb'}
          placeholder="휴대폰 번호를 입력해주세요 (숫자만)"
          autoCapitalize="none"
          onSubmitEditing={nextRef}
          onFocus={e => {
            currentRef.current = 3;
          }}
        />
        <Button
          title="인증번호 받기"
          titleStyle={{
            color: '#7e57c2',
          }}
          disabled={phoneAuthentication.isLoading}
          style={[
            styles.button,
            phoneAuthentication.isLoading ? styles.loading : null,
          ]}
        />
      </View>
      <Pressable
        style={({pressed}) => [
          styles.submit,
          Platform.OS === 'ios' && pressed && styles.submitPressed,
        ]}
        // onPress={register({
        //   userId,
        //   password,
        // })}
      >
        <Text style={styles.buttonText}>가입하기</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#fefefe',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    padding: 0,
    margin: 0,
    alignItems: 'center',
    height: 50,
  },
  input: {
    borderRadius: 3,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    fontSize: 15,
    fontWeight: '300',
  },
  flex: {
    flex: 1,
  },
  button: {
    marginLeft: 10,
    borderRadius: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#7e57c2',
    elevation: 0,
    justifyContent: 'center',
    height: '100%',
  },
  submit: {
    backgroundColor: '#7e57c2',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  submitPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  loading: {
    backgroundColor: '#bbbbbb',
  },
});
