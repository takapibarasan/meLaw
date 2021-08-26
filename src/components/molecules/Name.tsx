import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import { styles } from '../../styles/form';

const Name: FC = () => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>姓</Text>
        <Text style={styles.label2}>名</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.textInput} />
        <TextInput style={styles.textInput} />
      </View>
    </>
  );
};

export default Name;
