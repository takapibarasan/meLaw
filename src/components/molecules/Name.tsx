import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';

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
    marginLeft: 146,
    marginBottom: 10,
    marginTop: 20,
  },
});

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
