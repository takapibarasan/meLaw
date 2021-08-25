import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';
import { prefectures } from '../../data/forms';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    width: 120,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  textInputWide: {
    fontSize: 16,
    width: 360,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  label: {
    color: '#333333',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  label2: {
    color: '#333333',
    fontSize: 16,
    marginLeft: 100,
    marginBottom: 10,
    marginTop: 20,
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
    width: 120,
    marginLeft: 20,
    marginRight: 20,
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
    width: 120,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#eee',
  },
});

const Address: FC = () => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>郵便番号</Text>
        <Text style={styles.label2}>都道府県</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.textInput} />
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={prefectures}
          style={pickerSelectStyles}
        />
      </View>
      <Text style={styles.label}>市区町村・番地</Text>
      <TextInput style={styles.textInputWide} />
      <Text style={styles.label}>建物名・部屋番号など</Text>
      <TextInput style={styles.textInputWide} />
    </>
  );
};

export default Address;
