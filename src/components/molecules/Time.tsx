import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { hours, minutes } from '../../data/forms';

const styles = StyleSheet.create({
  label: {
    color: '#333333',
    fontSize: 16,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
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
