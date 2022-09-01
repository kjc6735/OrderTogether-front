import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useLogin} from '../hooks/useLogin';
import {RootStackNavigationProp} from './types';

export default function LoginScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {mutate, isLoading} = useLogin();
  const onPress = async () => {
    if (!id || !password) {
      console.log('아이디를 모두 입력해주세요.');
      return;
    }
    await mutate({id, password});
  };
  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'padding'})}>
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
            placeholder="password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={({pressed}) => [
              styles.submit,
              Platform.OS === 'ios' && pressed && styles.submitPressed,
            ]}
            onPress={onPress}>
            <Text>로그인</Text>
          </Pressable>
          <Text onPress={() => navigation.navigate('Register')}>회원가입</Text>
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
});
