import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';
import { prefectures } from '../../data/forms';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../styles/form';

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
