import React, {useEffect} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from 'react-query';
import {getChatList} from '../api';
import GoWriteButton from '../components/GoWriteButton';
import {useUserState} from '../contexts/UserContext';

function ChatListScreen() {
  const [user] = useUserState();
  const {data: chatList, isLoading} = useQuery('chatList', () =>
    getChatList(user!.id),
  );

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <GoWriteButton />
      <View
        style={{
          backgroundColor: '#f2f2f2',
          height: '100%',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <FlatList
          style={{backgroundColor: '#fff'}}
          data={chatList}
          renderItem={({item}) => (
            <View
              style={{
                // backgroundColor: select?.id === item.id ? '#e4e4e4' : '#fff',
                padding: 10,
              }}>
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                key={item.id}
                onPress={() => {}}>
                <Text style={{fontSize: 20}}>{item.title}</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    overflow: 'hidden',
                  }}
                />
              </Pressable>
            </View>
          )}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{backgroundColor: '#e0e0e0', height: 1, width: '100%'}}
              />
            );
          }}
        />
      </View>
    </>
  );
}

export default ChatListScreen;
