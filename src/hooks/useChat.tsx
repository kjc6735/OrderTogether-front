import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {createChat} from '../api';
import {RootStackNavigationProp} from '../screens/types';

export const useChat = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return useMutation(createChat, {
    onSuccess: async data => {
      console.log('chat success', data);
      navigation.navigate('Chat', {
        title: data.user.userId,
        room: data.room.name,
      });
    },
    onError: (e: AxiosError) => {
      console.log(e);
    },
  });
};
