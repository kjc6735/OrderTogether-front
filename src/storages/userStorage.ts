import EncryptedStorage from 'react-native-encrypted-storage';
import {User} from '../api/types';
const key = 'user';

const userStorage = () => {
  return {
    set: async (data: {user: User; toekn: string}) => {
      await EncryptedStorage.setItem(key, JSON.stringify(data));
      try {
      } catch (e) {
        console.log(e);
      }
    },
    get: async (
      find = null,
    ): Promise<{user: User; token: string} | User | string | null> => {
      const user = await EncryptedStorage.getItem(key);
      return user ? (find ? JSON.parse(user)[find] : JSON.parse(user)) : null;
    },
    clear: async () => {
      await EncryptedStorage.removeItem(key);
    },
  };
};

export default userStorage;
