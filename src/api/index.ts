import {User} from './types';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
});

export const setToken = (token: string) => {
  client.defaults.headers.common.jwt = token;
};

export const login = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<User> => {
  const {data} = await client.post('/login', {id, password});
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
