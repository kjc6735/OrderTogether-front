import axios from 'axios';
import {Platform} from 'react-native';

const client = axios.create({
  // baseURL: 'http://127.0.0.1:3000',
  baseURL:
    Platform.OS === 'android'
      ? 'http://172.20.10.2:3000'
      : 'http://localhost:3000',
  // baseURL: '10.0.2.2:3000',
});

export const setToken = (token: string) => {
  client.defaults.headers.common.jwt = token;
};

export const login = async ({id, password}: {id: string; password: string}) => {
  const {data} = await client.post('users/login', {userId: id, password});
  return data;
};

export const getCategory = async () => {
  const {data} = await client.get('/category');
  return data;
};

export const getSearchData = async (category: string) => {
  const {data} = await client.get(`/search/${category}`);
  return data;
};
