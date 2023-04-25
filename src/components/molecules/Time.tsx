import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import { styles, pickerSelectStylesNarrow } from '../../styles/form';
import { TextInput } from 'react-native-gesture-handler';

type Props = {
  hour: string;
  minute: string;
  setHour: React.Dispatch<React.SetStateAction<string>>;
  setMinute: React.Dispatch<React.SetStateAction<string>>;
};
const Time: FC<Props> = ({ hour, minute, setHour, setMinute }) => {
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
      <Text style={[styles.inputLabel, { marginLeft: 0 }]}>分頃</Text>
    </View>
  );
};

export default Time;
