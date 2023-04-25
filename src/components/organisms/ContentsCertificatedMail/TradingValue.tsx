import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  product: string;
  salesDate: firebase.firestore.Timestamp | null;
  salesAmount: string;
  paymentDueDate: firebase.firestore.Timestamp | null;
  paidAmount: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
  setSalesDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setSalesAmount: React.Dispatch<React.SetStateAction<string>>;
  setPaymentDueDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setPaidAmount: React.Dispatch<React.SetStateAction<string>>;
};
const TradingValue: FC<Props> = ({
  product,
  salesDate,
  salesAmount,
  paymentDueDate,
  paidAmount,
  setProduct,
  setSalesDate,
  setSalesAmount,
  setPaymentDueDate,
  setPaidAmount,
}) => {
  return (
    <>
      <Text style={styles.description}>
        販売条件に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>商品名と数量</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="ビール1ケース、ウイスキー2本"
        onChangeText={(value) => setProduct(value)}
        value={product}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売日時</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={salesDate} setDate={setSalesDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売金額</Text>
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
        <Text style={styles.label}>支払期限</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <DateTemplate date={paymentDueDate} setDate={setPaymentDueDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>支払済の金額</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        1円も代金が支払われていない場合、記載不要です。
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setPaidAmount(value)}
          value={paidAmount}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default TradingValue;
