import React, { FC } from 'react';
import { CheckBox, Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStylesWide } from '../../styles/form';
import DateTemplate from './Date';

const delayPaymentStartTypes = [
  { label: '訴状送達の日の翌日', value: 1 },
  { label: 'その他', value: 2 },
];
type Props = {
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: Date;
};
const DelayPayment: FC<Props> = ({
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
}) => {
  return (
    <>
      <CheckBox
        checked={existsDelayPayment}
        title="遅延損害金の請求有無"
        onPress={() => (existsDelayPayment = !existsDelayPayment)}
      />
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
          value={delayPayment}
          onChangeText={(value) => (delayPayment = value)}
        />
        <Text style={styles.text}>%</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害金の発生開始日</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => (delayPaymentStartType = value)}
        items={delayPaymentStartTypes}
        style={pickerSelectStylesWide}
        value={delayPaymentStartType}
      />
      {delayPaymentStartType === 2 ? (
        <DateTemplate date={delayPaymentStartDate} />
      ) : null}
    </>
  );
};

export default DelayPayment;
