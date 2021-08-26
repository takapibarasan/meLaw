import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Date from './Date';
import { styles, pickerSelectStyles } from '../../styles/form';

const delayedDamageStartDate = [
  { label: '訴状送達の日の翌日', value: '訴状送達の日の翌日' },
  { label: 'その他', value: 'その他' },
];
const DelayedDamage: FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害利率</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>年</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>%</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害金の発生開始日</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => {
          if (value == 'その他') setExpanded(true);
          else setExpanded(false);
        }}
        items={delayedDamageStartDate}
        style={pickerSelectStyles}
      />
      <View style={expanded ? { display: 'flex' } : { display: 'none' }}>
        <Date />
      </View>
    </>
  );
};

export default DelayedDamage;
