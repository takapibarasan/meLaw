import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { styles, pickerSelectStylesWide } from '../../../styles/form';
import RNPickerSelect from 'react-native-picker-select';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

const coolingOffTypes = [
  {
    label: '法的書面を受け取ってから20日間以内',
    value: 1,
  },
  { label: '法的書面を受け取っていない', value: 2 },
];

type Props = {
  service: string;
  salesDate: firebase.firestore.Timestamp | null;
  salesAmount: string;
  coolingOffType: number;
  setService: React.Dispatch<React.SetStateAction<string>>;
  setSalesDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setSalesAmount: React.Dispatch<React.SetStateAction<string>>;
  setCoolingOffType: React.Dispatch<React.SetStateAction<number>>;
};
const Information: FC<Props> = ({
  service,
  salesDate,
  salesAmount,
  coolingOffType,
  setService,
  setSalesDate,
  setSalesAmount,
  setCoolingOffType,
}) => {
  return (
    <>
      <Text style={styles.description}>
        契約条件に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>購入した商品名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        onChangeText={(value) => setService(value)}
        value={service}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>購入日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={salesDate} setDate={setSalesDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>購入金額</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setSalesAmount(value)}
          value={salesAmount}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>クーリングオフ制度を主張する根拠</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => setCoolingOffType(value)}
        items={coolingOffTypes}
        style={pickerSelectStylesWide}
        value={coolingOffType}
      />
    </>
  );
};

export default Information;
