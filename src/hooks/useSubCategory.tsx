import {useCallback} from 'react';
import {useQuery} from 'react-query';
import {getAllStore} from '../api';

const time = 60 * 60 * 24 * 1000;

export const useSubCategory = () => {
  const {data: subCategory} = useQuery('stores', getAllStore, {
    staleTime: time,
    cacheTime: time,
  });
  //   const filterSubCategory = useCallback(
  //     (filterId: number) => {
  //       console.log('called filterSubCategory');
  //       const data = subCategories.data!.filter(c => c.categoryId === filterId);
  //       return data.length ? data : null;
  //     },
  //     [subCategories.data],
  //   );

  return {
    subCategory,
    // filterSubCategory,
  };
};
