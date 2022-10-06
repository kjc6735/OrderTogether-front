import {useMutation} from 'react-query';
import {login, setToken} from '../api';
import Inform from '../components/Inform';
import {useUserState} from '../contexts/UserContext';

export const useLogin = () => {
  const [, setUser] = useUserState();
  return useMutation(login, {
    onSuccess: data => {
      console.log('success: ', data);
      setUser(data.user);
      setToken(data.token);
    },
    onError: (e: any) => {
      console.log('error ', e.response);
      const error = e.response.data;
      // Alert.alert('로그인 오류', error.message, [
      //   {text: 'OK', onPress: () => console.log('OK Pressed')},
      // ]);
      Inform({title: '로그인 실패', message: error.message});
    },
  });
};
