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
});

const LendMoney: FC = () => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>
          販売条件に関する情報を入力しましょう{' '}
        </Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>商品名</Text>
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <TextInput style={styles.textInputWide} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売日時</Text>
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売金額</Text>
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>支払期限</Text>
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <Date />
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
