import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useQuery} from 'react-query';
import {getAllStore, getCategory} from '../api';

function SelectCategory({
  onChange,
  value,
}: {
  onChange: Dispatch<SetStateAction<null>>;
  value: any;
}) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const {data: store, isLoading: storeLoading} = useQuery('store', getAllStore);
  const {data: categories, isLoading: categoryLoading} = useQuery(
    'category',
    getCategory,
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredStore, setFilteredStore] = useState(null);
  const [category, setCategory] = useState();
  useEffect(() => {
    store &&
      setFilteredStore(
        store.filter((s: any) => s.categoryId === selectedCategory),
      );
  }, [store, selectedCategory]);
  useLayoutEffect(() => {
    setCategory(categories);
  }, [categories]);
  return (
    <View>
      {category && (
        <DropDownPicker
          open={open}
          schema={{
            label: 'name',
            value: 'id',
          }}
          value={selectedCategory}
          items={category!}
          setOpen={setOpen}
          setValue={setSelectedCategory}
          zIndex={900}
          style={{
            marginBottom: 10,
            borderStyle: undefined,
          }}
        />
      )}
      {filteredStore && (
        <DropDownPicker
          schema={{
            label: 'name',
            value: 'id',
          }}
          open={open2}
          value={value}
          items={filteredStore}
          setOpen={setOpen2}
          zIndex={400}
          setValue={onChange}
          style={{
            marginBottom: 10,
            borderStyle: undefined,
          }}
        />
      )}
    </View>
  );
}

export default SelectCategory;
