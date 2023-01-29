import {useCallback} from 'react';
import {useQuery} from 'react-query';
import {getAllStore, getCategory as getCategoryApi} from '../api';

const time = 60 * 60 * 24 * 1000;
const useCategory = () => {
  const categories = useQuery('category', getCategoryApi, {
    onSuccess: () => {},
    cacheTime: time,
    staleTime: time,
    onError: () => {},
  });
  // const subCategories = useQuery('stores', getAllStore, {
  //   staleTime: time,
  //   cacheTime: time,
  // });
  // //카테고리 아이디 받기
  // const filterSubCategory = useCallback(
  //   (id: number) => {
  //     console.log('called filterSubCategory');
  //     return subCategories.data!.filter(c => c.categoryId === id);
  //   },
  //   [subCategories.data],
  // );

  return {
    categories,
    // subCategory: subCategories,
    // filterSubCategory,
  };
};

export default useCategory;
