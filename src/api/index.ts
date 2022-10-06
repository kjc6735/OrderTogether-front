import axios from 'axios';
import {Platform} from 'react-native';

const client = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://172.20.10.2:3000'
      : 'http://localhost:3000',
  // baseURL: '10.0.2.2:3000',
});

export const setToken = (token: string) => {
  client.defaults.headers.common.token = token;
};

export const login = async ({id, password}: {id: string; password: string}) => {
  const {data} = await client.post('/users/login', {userId: id, password});
  return data;
};

export const register = async ({
  userId,
  displayName,
  password,
  addressKo,
  zonecode,
  detail = null || undefined,
  addressEn,
}: {
  userId: string;
  displayName: string;
  password: string;
  addressKo: string;
  zonecode: string;
  detail: null | undefined | string;
  addressEn: string;
}) => {
  const {data} = await client.post('/users/register', {
    userId,
    password,
    displayName,
    addressKo,
    zonecode,
    addressEn,
    detail,
  });
  return data;
};

export const getCategory = async () => {
  const {data} = await client.get('/categories');
  return data;
};

export const getSearchData = async (category: string) => {
  const {data} = await client.get(`/search/${category}`);
  return data;
};

export const getPosts = async (category: string): Promise<any> => {
  const {data} = await client.get(`/category/${category}/posts`);
  return data;
};

export const getAllPosts = async () => {
  // console.log('token is ', client.defaults.headers.common.token);
  const {data} = await client.get('/posts');
  return data;
};
