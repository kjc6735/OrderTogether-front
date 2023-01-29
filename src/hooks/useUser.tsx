import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import {login as loginFn} from '../api';
import {
  MainTabNavigationProp,
  MainTabParamList,
  RootStackNavigationProp,
} from '../screens/types';
const useUser = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootStackNavigationProp>();

  const login = useMutation({
    mutationFn: loginFn,
    onSuccess: data => {
      navigation.navigate('MainTab');
    },
  });
  const logout = () => {};
  const update = () => {};

  return {
    login,
    logout,
    update,
  };
};
