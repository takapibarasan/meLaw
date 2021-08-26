import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Date from '../../molecules/Date';
import { styles } from '../../../styles/form';

const LendMoney: FC = () => {
  return (
    <>
      <Text style={styles.description}>
        販売条件に関する情報を入力しましょう{' '}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>商品名と数量</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="ビール1ケース、ウイスキー2本"
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売日時</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売金額</Text>
        <Text style={styles.required}>必須</Text>
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
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>返済済の金額</Text>
        <Text style={styles.optional}>任意</Text>
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
