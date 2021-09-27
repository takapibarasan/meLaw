import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { styles } from '../../styles/form';

type Props = {
  name: string;
};
const Name: FC<Props> = ({ name }) => {
  return (
    <>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={(value) => (name = value)}
      />
    </>
  );
};

export default Name;
