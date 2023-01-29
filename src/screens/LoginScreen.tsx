import {ActivityIndicator} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import IndicatorButton from '../components/IndicatorButton';
import Inform from '../components/Inform';
import {useUserState} from '../contexts/UserContext';
import useLoginEffect from '../effects/useLoginEffect';
import {useLogin} from '../hooks/useLogin';
import {MainTabNavigationProp, RootStackNavigationProp} from './types';

export default function LoginScreen() {
  const [user] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {mutate, isSuccess, isLoading} = useLogin();
  const onPress = useCallback(async () => {
    if (!id || !password) {
      return;
    }
    await mutate({id, password});
    console.log('test');
  }, [id, password, mutate]);
  useEffect(() => {
    if (isSuccess) {
      console.log('is');
      navigation.replace('MainTab');
    }
  }, [isSuccess, navigation]);
  useEffect(() => {
    if (user) {
      navigation.replace('MainTab');
    }
  }, [navigation, user]);

  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'padding'})}>
      <View style={styles.block}>
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#bbb'}
            placeholder="이메일 주소 또는 아이디"
            autoCapitalize="none"
            value={id}
            onChangeText={setId}
          />
          <TextInput
            style={styles.input}
            placeholder="패스워드"
            placeholderTextColor={'#bbb'}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            disabled={isLoading}
            style={({pressed}) => [
              styles.submit,
              Platform.OS === 'ios' && pressed && styles.submitPressed,
            ]}
            onPress={() => onPress()}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>로그인</Text>
            )}
          </Pressable>
          {/* <IndicatorButton title="로그인" /> */}
          {/* <View style={styles.padding} /> */}
          <View style={styles.linkWarp}>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Register')}>
              아이디 찾기
            </Text>
            <Text style={styles.seperater}>|</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Register')}>
              비밀번호 재설정
            </Text>
            <Text style={styles.seperater}>|</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Register')}>
              회원가입
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fefefe',
  },
  input: {
    borderRadius: 5,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '300',
  },
  submit: {
    marginTop: 30,
    marginBottom: 20,
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
  padding: {
    padding: 20,
  },
  linkWarp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    letterSpacing: 1.5,
  },
  seperater: {
    color: '#bbb',
    marginHorizontal: 12,
  },
});
