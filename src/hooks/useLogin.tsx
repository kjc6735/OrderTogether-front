import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {login} from '../api';
import {User} from '../api/types';
import {useUserState} from '../contexts/UserContext';

export const useLogin = () => {
  const [, setUser] = useUserState();
  return useMutation(login, {
    onSuccess: (data: User) => {
      setUser(data);
    },
    onError: () => {},
  });
};
