import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, View, TextInput } from 'react-native';
import Date from '../../molecules/Date';
import Duration from '../../molecules/Duration';
import { styles } from '../../../styles/form';

const Salary: FC = () => {
  return (
    <>
      <Text style={styles.description}>
        契約条件に関する情報を入力しましょう{' '}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>勤務開始日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Date />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃金未払期間</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Duration />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃金未払総額</Text>
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
    </>
  );
};

export default Salary;
