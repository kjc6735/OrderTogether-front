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
import {useMutation, useQuery} from 'react-query';
import {client, getAllStore, getCategory} from '../api';
import Inform from '../components/Inform';
import SelectCategory from '../components/SelectCategory';
import WriteBody from '../components/WriteBody';
import WriteHeader from '../components/WriteHeader';
import {useUserState} from '../contexts/UserContext';
import {usePost} from '../hooks/usePost';

function WriteScreen() {
  const navigation = useNavigation();
  const [user] = useUserState();
  const [items, setItems] = useState<{label: string; value: string}[]>([]);
  const {data: categories, isLoading: categoryLoading} = useQuery(
    'category',
    getCategory,
  );
  const {data: store, isLoading: storeLoading} = useQuery('store', getAllStore);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [category, setCategory] = useState<number | null>(0);
  const {mutate, isSuccess} = usePost();
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
    Inform({
      title: '알림',
      message: '글을 작성하시겠습니까?',
      objArr: [
        {
          text: '네',
          onPress: async () => {
            console.log('user is', user);
            console.log(client.defaults.headers.common.token);

            await mutate({
              title,
              content,
              storeId: category,
              address: user.addressKo,
            });
            if (isSuccess) {
              setTitle('');
              setContent('');
              setCategory(0);
            }
          },
        },
        {
          text: '아니요',
          onPress: () => {},
        },
        ,
      ],
    });
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
        title={title}
        content={content}
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
