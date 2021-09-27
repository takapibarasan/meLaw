import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { styles } from '../../styles/form';

type Props = {
  phoneNumber: string;
};
const PhoneNumber: FC<Props> = ({ phoneNumber }) => {
  return (
    <>
      <TextInput
        style={styles.numberInputWide}
        maxLength={11}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(value) => (phoneNumber = value)}
      />
    </>
  );
};

export default PhoneNumber;
