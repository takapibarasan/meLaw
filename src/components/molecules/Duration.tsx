import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { styles } from '../../styles/form';
import DateTemplate from './Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  startDate: firebase.firestore.Timestamp | null;
  endDate: firebase.firestore.Timestamp | null;
  setStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
};
const Duration: FC<Props> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <DateTemplate date={startDate} setDate={setStartDate} start={true} />
      </View>
      <DateTemplate date={endDate} setDate={setEndDate} end={true} />
    </>
  );
};

export default Duration;
