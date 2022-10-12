import {useMutation} from 'react-query';
import {createPost} from '../api';
import Inform from '../components/Inform';

export const usePost = () => {
  return useMutation(createPost, {
    onSuccess: data => {
      Inform({title: '알림', message: '글 쓰기 성공'});
    },
    onError: e => {
      const error = e.response.data;
      Inform({title: '에러', message: error.message});
    },
  });
};
