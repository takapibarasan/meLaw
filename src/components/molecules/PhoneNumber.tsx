import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { styles } from '../../styles/form';

type Props = {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};
const PhoneNumber: FC<Props> = ({ phoneNumber, setPhoneNumber }) => {
  return (
    <>
      <TextInput
        style={[styles.numberInputWide, { marginLeft: 20, width: 160 }]}
        maxLength={11}
        keyboardType="numeric"
        onChangeText={(value) => setPhoneNumber(value)}
        value={phoneNumber}
      />
    </>
  );
};

export default PhoneNumber;
