import {useMutation} from 'react-query';
import {register} from '../api';
import Inform from '../components/Inform';

export const useRegister = () => {
  return useMutation(register, {
    onSuccess: data => {
      Inform({title: '회원가입 성공', message: data.message});
    },
    onError: (e: any) => {
      const error = e.response.data;
      Inform({title: '회원가입 실패', message: error.message});
    },
  });
};
