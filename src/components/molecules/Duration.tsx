import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { years, months } from '../../data/forms';
import { styles, pickerSelectStyles } from '../../styles/form';

const Duration: FC = () => {
  return (
    <>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <RNPickerSelect
          onValueChange={(value) => {}}
          items={years}
          style={pickerSelectStyles}
        />
        <Text style={styles.label}>年</Text>
        <RNPickerSelect
          onValueChange={(value) => {}}
          items={months}
          style={pickerSelectStyles}
        />
        <Text style={styles.label}>月</Text>
        <Text style={styles.label}>から</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RNPickerSelect
          onValueChange={(value) => {}}
          items={years}
          style={pickerSelectStyles}
        />
        <Text style={styles.label}>年</Text>
        <RNPickerSelect
          onValueChange={(value) => {}}
          items={months}
          style={pickerSelectStyles}
        />
        <Text style={styles.label}>月</Text>
        <Text style={styles.label}>まで</Text>
      </View>
    </>
  );
};

export default Duration;
