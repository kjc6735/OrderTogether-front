import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectCategory from './SelectCategory';

type WriteBodyProp = {
  onChangeTitle: (text: string) => void;
  onChangeContent: (text: string) => void;
  onChangeCategory: () => void;
  category: any;
  title: string | null;
  content: string | null;
};

function WriteBody({
  onChangeTitle,
  onChangeContent,
  onChangeCategory,
  category,
  title,
  content,
}: WriteBodyProp) {
  const contentRef = useRef<TextInput>(null);
  return (
    <KeyboardAvoidingView
      enabled
      style={styles.avoidingView}
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
      keyboardVerticalOffset={100}>
      <TextInput
        onChangeText={(text: string) => onChangeTitle(text)}
        style={[styles.input, styles.title]}
        placeholder="제목"
        value={title ?? undefined}
        onSubmitEditing={() => {
          contentRef.current?.focus();
        }}
      />
      <SelectCategory onChange={onChangeCategory} value={category} />
      <TextInput
        value={content ?? undefined}
        placeholder="내용"
        multiline
        returnKeyType="next"
        onChangeText={text => onChangeContent(text)}
        style={[styles.input, styles.content]}
        ref={contentRef}
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
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
    zIndex: -1,
  },
  avoidingView: {
    flex: 1,
  },
  category: {
    flexDirection: 'column',
  },
});
export default WriteBody;
