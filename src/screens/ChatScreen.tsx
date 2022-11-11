import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
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
  const [message, setMessage] = useState();
  // const {data, isSuccess, refetch} = useMutation(postChat, {
  //   onSuccess: data => {
  //     console.log(data);
  //   },
  // });
  // console.log('params', params.data.room.name);
  const onPress = useCallback(() => {
    console.log('params', params.data.room.name);
  }, [params]);

  useEffect(() => {
    console.log('params', params.data.room.name);
    socket.on('connect', () => {});
    console.log('connected..?');
    socket.emit('join', {roomId: params.data.room.name});
    socket.on('message', res => {
      console.log('recieved message: ', res);
    });
  }, [params.data.room.name]);
  // useEffect(() => {
  //   if (params) {
  //     console.log('params: ', params.data.room.name);
  //     socket.on('connection', ss => {
  //       ss.emit('join', {room: params.data.room.name});
  //       ss.on('message', res => {
  //         console.log(res);
  //       });
  //     });
  //   }
  // }, [params]);

  // useEffect(() => {
  //   if (params) {
  // console.log('s', s);
  // socket.emit('join', {room: params.data.room.name});
  // socket.on('message', res => {
  //   console.log(res);
  //     });
  //   }

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [params, s]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.avoid}>
          <View style={styles.contents}>
            <MessageBox />
            <MessageBox />
          </View>
          <View style={styles.inputBlock}>
            <TextInput placeholder="메세지.." style={styles.input} />
            <Button title="+" onPress={() => onPress()} />
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
