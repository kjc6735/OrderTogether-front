import {Alert} from 'react-native';

type AlertButton = {
  text: string;
  onPress: () => any;
};

const Inform = ({
  title,
  message,
  objArr = null,
}: {
  title: string;
  message: string;
  objArr?: null | any;
}) => {
  return Alert.alert(
    title,
    message,
    objArr ?? [
      {
        text: 'OK',
        onPress: () => {},
      },
    ],
  );
};

export default Inform;
