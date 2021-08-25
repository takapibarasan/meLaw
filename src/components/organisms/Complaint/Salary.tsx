import React, { FC, useEffect, useState } from 'react';
import { Text, Input, Button, Icon, CheckBox } from 'react-native-elements';
import { StyleSheet, View, TextInput } from 'react-native';
import Name from '../../molecules/Name';
import Address from '../../molecules/Address';
import Date from '../../molecules/Date';
import Duration from '../../molecules/Duration';
import SalaryTemplate from '../ContentsCertificatedMail/Salary';

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
  numberInput: {
    fontSize: 16,
    width: 40,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
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
});

const Salary: FC = () => {
  return (
    <>
      <SalaryTemplate />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害利率</Text>
        <Text style={styles.any}>任意</Text>
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
      <CheckBox title="仮執行の有無" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考情報</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="資金繰りが苦しいから待ってくれとのことだったがその後も私が怠けていたなどと言って払ってくれません。"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <CheckBox title="給与等支払明細書" />
      <CheckBox title="登記事項証明書（商業登記簿謄本）" />
    </>
  );
};

export default Salary;
