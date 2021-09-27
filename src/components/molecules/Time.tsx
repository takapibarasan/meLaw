import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { styles, pickerSelectStylesNarrow } from '../../styles/form';
import { TextInput } from 'react-native-gesture-handler';

const Time: FC = () => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <TextInput style={styles.textInputNarrow} />
      <Text style={styles.inputLabel}>時</Text>
      <TextInput style={styles.textInputNarrow} />
      <Text style={styles.inputLabel}>分頃</Text>
    </View>
  );
};

export default Time;
