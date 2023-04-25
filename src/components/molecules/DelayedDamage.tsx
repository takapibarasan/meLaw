import React, { FC } from 'react';
import { CheckBox, Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStylesWide } from '../../styles/form';
import DateTemplate from './Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

const delayPaymentStartTypes = [
  { label: '訴状送達の日の翌日', value: 1 },
  { label: 'その他', value: 2 },
];
type Props = {
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
};
const DelayPayment: FC<Props> = ({
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
  setExistsDelayPayment,
  setDelayPayment,
  setDelayPaymentStartType,
  setDelayPaymentStartDate,
}) => {
  return (
    <>
      <CheckBox
        containerStyle={{ marginTop: 30 }}
        checked={existsDelayPayment}
        title="遅延損害金の請求有無"
        onPress={() => setExistsDelayPayment(!existsDelayPayment)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害利率</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        返還時期以降、貸付金の返済を滞納した場合に生じる損害賠償金の利率です。
        事前に取り決めていない場合は空欄にしてください。
        なお、2020年の民法改正で法廷利率は年3%となりましたので、取り決めがない場合は年3%となります。
        (3年ごとに変更の可能性がありますので、ご注意ください)
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>年</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={(value) => setDelayPayment(value)}
          value={delayPayment}
        />
        <Text style={styles.text}>%</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害金の発生開始日</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => setDelayPaymentStartType(value)}
        items={delayPaymentStartTypes}
        style={pickerSelectStylesWide}
        value={delayPaymentStartType}
      />
      {delayPaymentStartType === 2 ? (
        <DateTemplate
          date={delayPaymentStartDate}
          setDate={setDelayPaymentStartDate}
        />
      ) : null}
    </>
  );
};

export default DelayPayment;
