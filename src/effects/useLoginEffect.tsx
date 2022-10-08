import {useEffect} from 'react';
import {setToken} from '../api';
import {useUserState} from '../contexts/UserContext';
import userStorage from '../storages/userStorage';

const useLoginEffect = () => {
  const [, setUser] = useUserState();
  return useEffect(() => {
    async function func() {
      const user = await userStorage().get();
      if (user) {
        console.log('login effects: ', user);
        setUser(user.user);
        setToken(user.token);
      }
    }
    func();
  }, [setUser]);
};

export default useLoginEffect;
