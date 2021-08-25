import React, { FC, useEffect, useState } from 'react';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { StyleSheet, View, TextInput } from 'react-native';
import Name from '../../molecules/Name';
import Address from '../../molecules/Address';
import Date from '../../molecules/Date';

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
      <Text style={styles.description}>貸付金に関する情報を入力しましょう</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>貸し付けた日付</Text>
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>返還時期</Text>
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利率</Text>
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>返済済の金額</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default LendMoney;
