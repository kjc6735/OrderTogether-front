import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import {useCallback} from 'react';
import {useMutation, useQuery} from 'react-query';
import {createPost, getPostsByStoreId} from '../api';
import Inform from '../components/Inform';

export const usePost = (id: number | null) => {
  const navigation = useNavigation();

  const posts = useQuery(
    ['posts', {subCategoryId: id}],
    () => (id !== null ? getPostsByStoreId({id}) : null),
    {
      enabled: id !== null,
    },
  );
  // const posts = id ? useQuery(['posts', {subCategoryId: id}]) : null;

  const create = useMutation(createPost, {
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
    onError: e => {
      const error = e.response.data;
      Inform({title: '에러', message: error.message});
    },
  });

  return {
    posts: posts.data,
    create,
  };
};
