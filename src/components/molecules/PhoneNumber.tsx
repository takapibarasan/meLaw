import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import { styles } from '../../styles/form';

const PhoneNumber: FC = () => {
  return (
    <>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.textInput}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>-</Text>
        <TextInput
          style={styles.textInput}
          maxLength={4}
          keyboardType="numeric"
        />
        <Text style={styles.text}>-</Text>
        <TextInput
          style={styles.textInput}
          maxLength={4}
          keyboardType="numeric"
        />
      </View>
    </>
  );
};

export default PhoneNumber;
