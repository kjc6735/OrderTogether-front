import {useRoute} from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQuery} from 'react-query';
import io from 'socket.io-client';
import {client, postChat} from '../api';
import MessageBox from '../components/MessageBox';
import {useSocketState} from '../contexts/SocketContext';
import {ChatScreenRouteProp} from './types';
const url =
  Platform.OS === 'ios' ? 'http://localhost:81' : 'http://10.0.2.2:81';
const namespace = '/dm';
const socket = io(`${url}${namespace}`);

export default function ChatScreen() {
  const {params} = useRoute<ChatScreenRouteProp>();
  const [message, setMessage] = useState<string[]>([]);
  const inputRef = useRef<TextInput | null>(null);
  const [input, setInput] = useState<string | undefined>('');
  // const {data, isSuccess, refetch} = useMutation(postChat, {
  //   onSuccess: data => {
  //     console.log(data);
  //   },
  // });
  // console.log('params', params.data.room.name);
  const onPress = useCallback(
    (e: any) => {
      socket.emit('message', {roomId: params.data.room.name, input});
      setInput('');
    },
    [input, params.data.room.name],
  );

  useEffect(() => {
    // console.log('params', params.data.room.name);
    // socket.on('connect', () => {});
    // console.log('connected..?');
    // socket.emit('join', {roomId: params.data.room.name});

    socket.on('connection', s => {
      s.join(params.data.room.name);
    });
    socket.on('message', res => {
      console.log('recieved message: ', res);
    });
    return () => {
      socket.on('disconnect', () => {
        console.log(socket.id);
      });
    };
  }, [params.data.room.name]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.avoid}>
          <View style={styles.contents}>
            <Text>test</Text>
          </View>
          <View style={styles.inputBlock}>
            <TextInput
              ref={inputRef}
              placeholder="메세지.."
              style={styles.input}
              value={input}
              onChange={e => {
                setInput(e.nativeEvent.text);
              }}
            />
            <Button title="+" onPress={onPress} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  contents: {
    flex: 1,
    paddingTop: 20,
  },
  avoid: {
    flex: 1,
  },
  inputBlock: {
    height: 64,
    paddingHorizontal: 16,
    borderColor: '#e4e4e4',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    paddingVertical: 0,
  },
});
