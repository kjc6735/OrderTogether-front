import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {getAllStore, getCategory} from '../api';

function WriteScreen() {
  const {data: category, isLoading: categoryLoading} = useQuery(
    'category',
    getCategory,
  );
  const {data: store, isLoading: storeLoading} = useQuery('store', getAllStore);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const contentRef = useRef<TextInput>(null);
  if (categoryLoading || storeLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        enabled
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'height' : undefined}
        keyboardVerticalOffset={100}>
        <TextInput
          value={title}
          onChangeText={(text: string) => setTitle(text)}
          style={styles.input}
          placeholder="제목"
          returnKeyType="next"
          onSubmitEditing={() => {
            contentRef.current?.focus();
          }}
        />
        {/* <DropDownPicker
          open={open}
          value={selectedCategory}
          items={category}
          setOpen={setOpen}
          setValue={}
          setItems={}
        /> */}
        <TextInput
          placeholder="내용"
          multiline
          // textAlignVertical="top"

          returnKeyType="send"
          onChangeText={text => setContent(text)}
          value={content}
          style={[styles.input, styles.content]}
          ref={contentRef}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ddd',
  },
  input: {
    padding: 16,
    backgroundColor: '#fff',
    fontSize: 15,
    marginBottom: 20,
  },
  content: {
    paddingTop: 16,
    flex: 1,
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
