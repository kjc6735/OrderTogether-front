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
import {useUserState} from '../contexts/UserContext';
import {ChatScreenRouteProp} from './types';
const url =
  Platform.OS === 'ios' ? 'http://localhost:81' : 'http://10.0.2.2:81';
const namespace = '/dm';
const socket = io(`${url}${namespace}`);

export default function ChatScreen() {
  const [user] = useUserState();
  const {params} = useRoute<ChatScreenRouteProp>();
  const [message, setMessage] = useState<{}[]>([]);
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
      socket.emit('sendToServer', {
        roomId: params.room,
        message: input,
        user: user?.displayName,
      });
      setInput('');
    },
    [input, params.room, user?.displayName],
  );
  useEffect(() => {
    console.log(message.length);
  }, []);
  useEffect(() => {
    socket.on('connection', () => {});
    socket.emit('join', {roomId: params.room, os: Platform.OS});
    return () => {
      socket.on('disconnect', () => {
        console.log(socket.id);
      });
    };
  }, []);

  useEffect(() => {
    socket.on('message', res => {
      console.log('res is ', res);
      setMessage(prev => [...prev, res]);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.avoid}>
          <View style={styles.contents}>
            {message.map((msg, idx) => {
              return (
                <MessageBox key={idx} name={msg.user} message={msg.message} />
              );
            })}
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
