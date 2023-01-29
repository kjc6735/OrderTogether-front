import {useMutation} from 'react-query';
import {
  checkDuplicateUserId as checkDuplicateUserIdApi,
  register as registerApi,
  phoneAuthentication as phoneAuthenticationApi,
} from '../api';
import Inform from '../components/Inform';

export const useRegister = () => {
  const register = useMutation(registerApi, {
    onSuccess: data => {
      Inform({title: '회원가입 성공', message: data.message});
    },
    onError: (e: any) => {
      const error = e.response.data;
      Inform({title: '회원가입 실패', message: error.message});
    },
  });
  const checkDuplicateUserId = useMutation(checkDuplicateUserIdApi, {
    onSuccess: async data => {
      return !!data;
    },
    onError: error => {
      console.log(error);
    },
  });
  const phoneAuthentication = useMutation(phoneAuthenticationApi, {
    onSuccess: async data => {
      return !!data;
    },
    onError: error => {
      console.log(error);
    },
  });
  return {
    register,
    checkDuplicateUserId,
    phoneAuthentication,
  };
};
