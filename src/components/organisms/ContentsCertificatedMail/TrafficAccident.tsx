import React, { FC, useEffect, useState } from 'react';
import { Text, Icon } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Date from '../../molecules/Date';
import Time from '../../molecules/Time';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../../styles/form';

const trafficAccidentDamageType = [
  { label: '修理費', value: '0' },
  { label: '格落ち損(評価損)', value: '0' },
  { label: '代車料', value: '0' },
  { label: '買替差額', value: '0' },
  { label: '登録手続関係費', value: '0' },
  { label: '休車損害', value: '0' },
];
const TrafficAccident: FC = () => {
  const [damageCount, setDamageCount] = useState([null]);

  return (
    <>
      <Text style={styles.description}>
        交通事故に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>交通事故発生日時</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
      <Time />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>損害</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      {damageCount.map(() => (
        <View
          style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}
        >
          <RNPickerSelect
            onValueChange={(value) => {}}
            items={trafficAccidentDamageType}
            style={pickerSelectStyles}
          />
          <TextInput
            style={styles.numberInputWide}
            maxLength={3}
            keyboardType="numeric"
          />
          <Text style={styles.text}>円</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.add}
        onPress={() => {
          setDamageCount([...damageCount, null]);
        }}
      >
        <Icon reverse size={12} color="#EB5757" name="add" />
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#EB5757' }}>
          項目を追加
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default TrafficAccident;
