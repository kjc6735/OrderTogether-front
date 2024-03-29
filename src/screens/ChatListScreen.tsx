import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from 'react-query';
import {getChatList} from '../api';
import GoWriteButton from '../components/GoWriteButton';
import {useUserState} from '../contexts/UserContext';
import {ChatScreenRouteProp, MainTabNavigationProp} from './types';

function ChatListScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [user] = useUserState();
  const {
    data: chatList,
    isLoading,
    refetch,
  } = useQuery('chatList', getChatList);
  useEffect(() => {
    if (!chatList) {
      refetch();
    }
  }, [chatList, refetch]);
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
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
                onPress={() => {
                  console.log(item.id);
                  navigation.navigate('Chat', {
                    title: item.user.userId,
                    room: item.room.name,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 20,
                  }}>{`${item.user.userId}`}</Text>
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
        <GoWriteButton />
      </View>
    </>
  );
}

export default ChatListScreen;
