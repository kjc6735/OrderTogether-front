import {Category, SubCategory} from './types';
import axios from 'axios';
import {Platform} from 'react-native';

export const client = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'
      : 'http://localhost:3000',
  // baseURL: '10.0.2.2:3000',
});

export const setToken = (token: string | null) => {
  // token ? client.defaults.headers.common.token = token;
  if (token) {
    client.defaults.headers.common.token = token;
  } else {
    delete client.defaults.headers.common.token;
  }
};

export const checkDuplicateUserId = async ({
  userId,
}: {
  userId: string;
}): Promise<boolean> => {
  const {data} = await client.post('/users/check', {userId});
  return data;
};

export const phoneAuthentication = async ({phone}: {phone: string}) => {
  const {data} = await client.post('/users/check', {phone});
  return data;
};

export const login = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<any> => {
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
  zonecode: number;
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

export const getCategory = async (): Promise<Category[]> => {
  const {data} = await client.get('/categories');
  return data;
};

export const removePost = async (postId: number) => {
  const {data} = await client.delete(`/posts/${postId}`);
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

export const getPostsByCategoryId = async ({
  id,
}: {
  id: number;
}): Promise<any> => {
  const {data} = await client.get(`/category/${id}/posts`);
  return data;
};

export const getAllPosts = async () => {
  // console.log('token is ', client.defaults.headers.common.token);
  const {data} = await client.get('/posts');
  return data;
};

export const getMyPosts = async () => {
  const {data} = await client.get('/posts/user/me');
  return data;
};

export const getAllStore = async (): Promise<SubCategory[]> => {
  const {data} = await client.get('/stores');
  return data;
};

export const getChatList = async () => {
  const {data} = await client.get('/room/mychat');
  console.log(data);
  return data;
};

// export const resetCategory = async (data: any) => {
//   return data.map((c: any) => {
//     return {label: c.name, value: c.id};
//   });
// };

export const getPostsByStoreId = async ({id}: {id: number}) => {
  const {data} = await client.get(`/stores/${id}/posts`);
  // console.log('GET_POST id: ', id, data);
  return data;
};
export const createPost = async ({
  title,
  content,
  storeId,
  address,
}: {
  title: string;
  content: string;
  storeId: number;
  address: string;
}) => {
  const response = await client.post('posts', {
    title,
    describe: content,
    storeId,
    addressKo: address,
  });
  console.log(response);
  return response.data;
};
export async function postChat(url, message) {
  const {data} = await client.post(`/room/${url}/dm`, {
    message,
  });
}

export const createChat = async (postId: number) => {
  const {data} = await client.post('/room', {postId});
  return data;
};

//"https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords={입력_좌표}&sourcecrs={좌표계}&orders={변환_작업_이름}&output={출력_형식}" \
export const naverGetReverse = async ({
  longitude,
  latitude,
}: {
  longitude: any;
  latitude: any;
}) => {
  console.log(longitude);
  const output = 'json';
  const clientId = 'wj74neb00m';
  const secret = 'P4is833qIFwomIry8TEVJcNg3g8YZXzLLANu0R0V';
  const header = {
    'X-NCP-APIGW-API-KEY-ID': clientId,
    'X-NCP-APIGW-API-KEY': secret,
  };
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${longitude},${latitude}&output=${output}&orders=addr,admcode,roadaddr`;
  console.log(url);
  const {data} = await axios.get(url, {
    headers: {
      ...header,
    },
  });
  console.log(JSON.stringify(data));
  return data;
};
