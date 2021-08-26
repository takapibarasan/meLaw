import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Date from '../../molecules/Date';
import { styles } from '../../../styles/form';

const LendMoney: FC = () => {
  return (
    <>
      <Text style={styles.description}>貸付金に関する情報を入力しましょう</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>貸し付けた日付</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>返還時期</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利率</Text>
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
