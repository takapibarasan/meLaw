import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { hours, minutes } from '../../data/forms';
import { styles, pickerSelectStyles } from '../../styles/form';

const Time: FC = () => {
  return (
    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20 }}>
      <RNPickerSelect
        onValueChange={(value) => {}}
        items={hours}
        style={pickerSelectStyles}
      />
      <Text style={styles.label}>時</Text>
      <RNPickerSelect
        onValueChange={(value) => {}}
        items={minutes}
        style={pickerSelectStyles}
      />
      <Text style={styles.label}>分</Text>
    </View>
  );
};

export default Time;
