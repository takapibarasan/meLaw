import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { styles } from '../../styles/form';
import DateTemplate from './Date';

type Props = {
  startDate: Date;
  endDate: Date;
};
const Duration: FC<Props> = ({ startDate, endDate }) => {
  return (
    <>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <DateTemplate date={startDate} />
        <Text style={styles.inputLabel}>から</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <DateTemplate date={endDate} />
        <Text style={styles.inputLabel}>まで</Text>
      </View>
    </>
  );
};

export default Duration;
