import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    width: 160,
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
    width: 240,
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
    marginLeft: 125,
    marginBottom: 10,
    marginTop: 20,
  },
});

const Bank: FC = () => {
  const [checked, setChecked] = React.useState('first');
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>金融機関名</Text>
        <Text style={styles.label2}>支店名</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.textInput} />
        <TextInput style={styles.textInput} />
      </View>
      <Text style={styles.label}>口座種別</Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <RadioButton.Item
          value="first"
          label="普通預金"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
        <RadioButton.Item
          value="second"
          label="当座預金"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        />
      </View>
      <Text style={styles.label}>口座番号</Text>
      <TextInput
        style={styles.textInput}
        maxLength={7}
        keyboardType="numeric"
      />
      <Text style={styles.label}>口座名義人名（カナ）</Text>
      <TextInput style={styles.textInputWide} />
    </>
  );
};

export default Bank;
