import {useMutation} from 'react-query';
import {login, setToken} from '../api';
import {useUserState} from '../contexts/UserContext';

export const useLogin = () => {
  const [, setUser] = useUserState();
  return useMutation(login, {
    onSuccess: data => {
      setUser(data);
      setToken(data.token);
    },
    onError: e => {
      console.log(e);
    },
  });
};
