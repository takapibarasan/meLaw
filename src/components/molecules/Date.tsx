import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
  years,
  months,
  days31,
  days30,
  days29,
  days28,
} from '../../data/forms';

const styles = StyleSheet.create({
  label: {
    color: '#333333',
    fontSize: 16,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});

const pickerSelectStylesWide = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 100,
    marginLeft: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 100,
    marginLeft: 20,
    backgroundColor: '#eee',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 60,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 60,
    backgroundColor: '#eee',
  },
});

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
        style={pickerSelectStylesWide}
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
