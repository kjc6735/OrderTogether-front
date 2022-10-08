import EncryptedStorage from 'react-native-encrypted-storage';
import {User} from '../api/types';
const key = 'user';

const userStorage = () => {
  return {
    set: async (user: User) => {
      await EncryptedStorage.setItem(key, JSON.stringify(user));
      try {
      } catch (e) {
        console.log(e);
      }
    },
    get: async (): Promise<User> => {
      const user = await EncryptedStorage.getItem(key);
      return user ? JSON.parse(user) : null;
    },
    clear: async () => {
      await EncryptedStorage.removeItem(key);
    },
  };
};

export default userStorage;
