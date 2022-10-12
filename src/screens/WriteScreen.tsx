import {useNavigation} from '@react-navigation/native';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import {useQuery} from 'react-query';
import {getAllStore, getCategory} from '../api';
import Inform from '../components/Inform';
import SelectCategory from '../components/SelectCategory';
import WriteBody from '../components/WriteBody';
import WriteHeader from '../components/WriteHeader';

function WriteScreen() {
  const navigation = useNavigation();

  const [items, setItems] = useState<{label: string; value: string}[]>([]);
  const {data: categories, isLoading: categoryLoading} = useQuery(
    'category',
    getCategory,
  );
  const {data: store, isLoading: storeLoading} = useQuery('store', getAllStore);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const contentRef = useRef<TextInput>(null);
  const [category, setCategory] = useState<number | null>(0);

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {
    if (!title || !category || !content) {
      Inform({
        title: '알림',
        message: '모든 항목을 입력해주세요',
      });
      return;
    }
  }, [title, category, content]);
  if (categoryLoading || storeLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <WriteHeader leftButtonPress={onGoBack} rightButtonPress={onSubmit} />
      <WriteBody
        onChangeTitle={setTitle}
        onChangeCategory={setCategory}
        onChangeContent={setContent}
        category={category}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
});

export default WriteScreen;
