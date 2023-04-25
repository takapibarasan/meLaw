import React, { FC } from 'react';
import { TextInput } from 'react-native';
import { styles } from '../../styles/form';

type Props = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};
const Name: FC<Props> = ({ name, setName }) => {
  return (
    <>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setName(value)}
        value={name}
      />
    </>
  );
};

export default Name;
