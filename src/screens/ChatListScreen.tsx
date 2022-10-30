import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {getChatList} from '../api';
import {useUserState} from '../contexts/UserContext';

function ChatListScreen() {
  const [user] = useUserState();
  const {data: chatList, isLoading} = useQuery('chatList', () =>
    getChatList(1),
  );
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={chatList}
      renderItem={({item}) => (
        <View>
          <Text>{item.id}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default ChatListScreen;
