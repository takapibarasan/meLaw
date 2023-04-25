import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { styles } from '../../styles/form';
import { TextInput } from 'react-native-gesture-handler';

type Props = {
  hour: string;
  minute: string;
  hour2: string;
  minute2: string;
  setHour: React.Dispatch<React.SetStateAction<string>>;
  setMinute: React.Dispatch<React.SetStateAction<string>>;
  setHour2: React.Dispatch<React.SetStateAction<string>>;
  setMinute2: React.Dispatch<React.SetStateAction<string>>;
};
const TimeDuration: FC<Props> = ({
  hour,
  minute,
  hour2,
  minute2,
  setHour,
  setMinute,
  setHour2,
  setMinute2,
}) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
      <TextInput
        style={styles.numberInputNarrow}
        onChangeText={(value) => setHour(value)}
        value={hour}
        maxLength={2}
      />
      <Text style={[styles.inputLabel, { marginLeft: 0 }]}>時</Text>
      <TextInput
        style={styles.numberInputNarrow}
        onChangeText={(value) => setMinute(value)}
        value={minute}
        maxLength={2}
      />
      <Text style={[styles.inputLabel, { marginLeft: 0 }]}>分</Text>
      <Text style={[styles.inputLabel, { marginLeft: 10 }]}>〜</Text>
      <TextInput
        style={styles.numberInputNarrow}
        onChangeText={(value) => setHour2(value)}
        value={hour2}
        maxLength={2}
      />
      <Text style={[styles.inputLabel, { marginLeft: 0 }]}>時</Text>
      <TextInput
        style={styles.numberInputNarrow}
        onChangeText={(value) => setMinute2(value)}
        value={minute2}
        maxLength={2}
      />
      <Text style={[styles.inputLabel, { marginLeft: 0 }]}>分</Text>
    </View>
  );
};

export default TimeDuration;
