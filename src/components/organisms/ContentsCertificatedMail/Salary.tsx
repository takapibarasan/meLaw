import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Duration from '../../molecules/Duration';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  workStartDate: firebase.firestore.Timestamp | null;
  unpaidSalaryStartDate: firebase.firestore.Timestamp | null;
  unpaidSalaryEndDate: firebase.firestore.Timestamp | null;
  unpaidSalary: string;
  setWorkStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setUnpaidSalaryStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setUnpaidSalaryEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setUnpaidSalary: React.Dispatch<React.SetStateAction<string>>;
};
const Salary: FC<Props> = ({
  workStartDate,
  unpaidSalaryStartDate,
  unpaidSalaryEndDate,
  unpaidSalary,
  setWorkStartDate,
  setUnpaidSalaryStartDate,
  setUnpaidSalaryEndDate,
  setUnpaidSalary,
}) => {
  return (
    <>
      <Text style={styles.description}>
        契約条件に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>勤務開始日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={workStartDate} setDate={setWorkStartDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>給料未払期間</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Duration
        startDate={unpaidSalaryStartDate}
        endDate={unpaidSalaryEndDate}
        setStartDate={setUnpaidSalaryStartDate}
        setEndDate={setUnpaidSalaryEndDate}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>給料未払総額</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setUnpaidSalary(value)}
          value={unpaidSalary}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default Salary;
