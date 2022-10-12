import React from 'react';
import {useMutation} from 'react-query';
import {getPosts} from '../api';

const usePost = () => {
  return useMutation(getPosts, {
    onMutate: categoryParam => {
      console.log('mutate ', categoryParam);
    },
    onSuccess: data => {
      console.log(data);
    },
  });
};

export default usePost;
