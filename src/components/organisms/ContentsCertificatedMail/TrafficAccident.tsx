import React, { FC, useEffect, useState } from 'react';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Name from '../../molecules/Name';
import Address from '../../molecules/Address';
import Date from '../../molecules/Date';
import Time from '../../molecules/Time';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  descriptionAttention: {
    marginTop: 40,
    color: '#EB5757',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  labelAttention: {
    marginTop: 30,
    color: '#EB5757',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  any: {
    marginTop: 30,
    color: '#4682b4',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#4682b4',
  },
  description: {
    fontSize: 20,
    marginTop: 40,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  numberInputWide: {
    fontSize: 16,
    width: 120,
    backgroundColor: 'white',
    height: 40,
    marginRight: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  text: {
    color: '#333333',
    fontSize: 16,
    marginTop: 12,
  },
  label: {
    color: '#333333',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 30,
  },
  add: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5e4e4',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginRight: 40,
    height: 40,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 160,
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
    width: 160,
    backgroundColor: '#eee',
  },
});

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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>
          交通事故に関する情報を入力しましょう{' '}
        </Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <Text style={styles.label}>交通事故発生日時</Text>
      <Date />
      <Time />
      <Text style={styles.label}>損害</Text>
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
