import {useMutation} from 'react-query';
import {login, setToken} from '../api';
import {User} from '../api/types';
import Inform from '../components/Inform';
import {useUserState} from '../contexts/UserContext';
import userStorage from '../storages/userStorage';

export const useLogin = () => {
  const [, setUser] = useUserState();
  return useMutation(login, {
    onSuccess: async data => {
      console.log('success android');
      delete data.message;
      delete data.success;
      setUser(data.user);
      setToken(data.token);
      // await storage.set(data);
      await userStorage().set(data);
    },
    onError: (e: any) => {
      console.log('error ', e.response);
      const error = e.response.data;

      Inform({title: '로그인 실패', message: error.message});
    },
  });
};
