import App from 'App';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-elements';

const DocumentScreen: FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <FAB
        size="large"
        color="#EB5757"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon={{
          name: 'add',
          size: 25,
          color: 'white',
        }}
        onPress={() => navigation.navigate('書類作成')}
      />
    </>
  );
};

export default DocumentScreen;
