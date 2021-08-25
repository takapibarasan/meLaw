import React, { FC, useEffect, useState } from 'react';
import { Text, Input, Button, CheckBox } from 'react-native-elements';
import { StyleSheet, View, TextInput } from 'react-native';
import Duration from '../../molecules/Duration';
import LendMoneyTemplate from '../ContentsCertificatedMail/LendMoney';

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
  textInputWide: {
    fontSize: 16,
    width: 360,
    backgroundColor: 'white',
    height: 80,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  description: {
    fontSize: 20,
    marginTop: 40,
    marginLeft: 20,
    fontWeight: 'bold',
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

const LendMoney: FC = () => {
  return (
    <>
      <LendMoneyTemplate />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利息の支払期間</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <Duration />
      <CheckBox title="仮執行の有無" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の特約</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="返済金は、元本、利息、遅延損害金の順に充当する"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考情報</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="被告らは自動車の修理代金を相殺したと言って支払おうとしない"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <CheckBox title="契約書" />
      <CheckBox title="借用書" />
      <CheckBox title="念書" />
      <CheckBox title="登記事項証明書（商業登記簿謄本）" />
    </>
  );
};

export default LendMoney;
