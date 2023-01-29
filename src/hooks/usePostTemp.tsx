import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import {useMutation} from 'react-query';
import {createPost} from '../api';
import Inform from '../components/Inform';

export const usePostTemp = () => {
  const navigation = useNavigation();
  return useMutation(createPost, {
    onSuccess: data => {
      Inform({
        title: '알림',
        message: '글 쓰기 성공',
        objArr: [
          {
            text: '확인',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
      });
    },
    onError: (e: any) => {
      const error = e.response.data;
      Inform({title: '에러', message: error.message});
    },
  });
};
