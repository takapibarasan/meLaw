import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { years, months } from '../../data/forms';

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

const Duration: FC = () => {
  return (
    <>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <RNPickerSelect
          onValueChange={(value) => {}}
          items={years}
          style={pickerSelectStylesWide}
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
          style={pickerSelectStylesWide}
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
