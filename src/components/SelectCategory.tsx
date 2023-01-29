import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Category, SubCategory} from '../api/types';
import useCategory from '../hooks/useCategory';
import {useSubCategory} from '../hooks/useSubCategory';

function SelectCategory({
  onChange,
  value,
  fixed = true,
}: {
  onChange: Dispatch<SetStateAction<null>>;
  value: any;
  fixed?: boolean | undefined;
}) {
  const {categories} = useCategory();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const {subCategory} = useSubCategory();
  const filtered = useCallback(() => {
    return (
      selectedCategory !== null &&
      subCategory !== null &&
      subCategory?.filter(d => d.categoryId === selectedCategory)
    );
  }, [selectedCategory, subCategory]);
  return (
    <View
      style={[
        styles.wrapper,
        fixed && styles.fixed,
        fixed && Platform.OS === 'ios' && styles.ios,
      ]}>
      {categories.data && (
        <DropDownPicker
          open={open}
          schema={{
            label: 'name',
            value: 'id',
          }}
          value={selectedCategory}
          items={categories.data!}
          setOpen={setOpen}
          setValue={setSelectedCategory}
          zIndex={900}
          style={{
            marginBottom: 10,
            borderStyle: undefined,
          }}
        />
      )}
      {subCategory && selectedCategory && (
        <DropDownPicker
          schema={{
            label: 'name',
            value: 'id',
          }}
          open={open2}
          value={value}
          items={filtered()}
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
