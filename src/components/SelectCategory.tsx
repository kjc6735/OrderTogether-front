import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useQuery} from 'react-query';
import {getAllStore, getCategory} from '../api';

function SelectCategory({
  onChange,
  value,
  fixed = true,
}: {
  onChange: Dispatch<SetStateAction<null>>;
  value: any;
  fixed: boolean | undefined;
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
    <View
      style={[
        styles.wrapper,
        fixed && styles.fixed,
        fixed && Platform.OS === 'ios' && styles.ios,
      ]}>
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
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    zIndex: 999,
  },
  fixed: {
    position: 'absolute',
    top: 20,
  },
  ios: {
    top: 60,
  },
});
export default SelectCategory;
