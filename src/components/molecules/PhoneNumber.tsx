import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    width: 70,
    backgroundColor: 'white',
    height: 40,
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
  text: {
    color: '#333333',
    fontSize: 16,
    marginTop: 12,
    marginLeft: 5,
    marginRight: 5,
  },
});

const PhoneNumber: FC = () => {
  return (
    <>
      <Text style={styles.label}>電話番号</Text>
      <View style={{ flexDirection: 'row', marginLeft: 20}}>
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
