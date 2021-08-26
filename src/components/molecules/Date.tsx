import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
  years,
  months,
  days31,
  days30,
  days29,
  days28,
} from '../../data/forms';
import { styles, pickerSelectStyles } from '../../styles/form';

const monthsHaving31Days = ['1', '3', '5', '7', '8', '10', '12'];
const monthsHaving30Days = ['4', '6', '9', '11'];
const monthsHaving28Or29Days = ['2'];
const Date: FC = () => {
  const [days, setDays] = useState(days31);
  const [FebruaryDays, setFebruaryDays] = useState(days28);
  return (
    <View style={{ flexDirection: 'row' }}>
      <RNPickerSelect
        onValueChange={(value) => {
          if (Number(value) % 4 === 0) setFebruaryDays(days29);
          else setFebruaryDays(days28);
        }}
        items={years}
        style={pickerSelectStyles}
      />
      <Text style={styles.label}>年</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          if (monthsHaving31Days.includes(value)) setDays(days31);
          if (monthsHaving30Days.includes(value)) setDays(days30);
          if (monthsHaving28Or29Days.includes(value)) setDays(FebruaryDays);
        }}
        items={months}
        style={pickerSelectStyles}
      />
      <Text style={styles.label}>月</Text>
      <RNPickerSelect
        onValueChange={(value) => {}}
        items={days}
        style={pickerSelectStyles}
      />
      <Text style={styles.label}>日</Text>
    </View>
  );
};

export default Date;
