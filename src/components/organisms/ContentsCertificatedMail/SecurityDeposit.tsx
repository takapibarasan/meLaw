import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Address from '../../molecules/Address';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  rentPostCode: string;
  rentPrefecture: string;
  rentCity: string;
  rentBuilding: string;
  rent: string;
  expenses: string;
  depositAmount: string;
  leavingDate: firebase.firestore.Timestamp | null;
  setRentPostCode: React.Dispatch<React.SetStateAction<string>>;
  setRentPrefecture: React.Dispatch<React.SetStateAction<string>>;
  setRentCity: React.Dispatch<React.SetStateAction<string>>;
  setRentBuilding: React.Dispatch<React.SetStateAction<string>>;
  setRent: React.Dispatch<React.SetStateAction<string>>;
  setExpenses: React.Dispatch<React.SetStateAction<string>>;
  setDepositAmount: React.Dispatch<React.SetStateAction<string>>;
  setLeavingDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
};
const SecurityDeposit: FC<Props> = ({
  rentPostCode,
  rentPrefecture,
  rentCity,
  rentBuilding,
  rent,
  expenses,
  depositAmount,
  leavingDate,
  setRentPostCode,
  setRentPrefecture,
  setRentCity,
  setRentBuilding,
  setRent,
  setExpenses,
  setDepositAmount,
  setLeavingDate,
}) => {
  return (
    <>
      <Text style={styles.description}>
        賃貸条件に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address
        postCode={rentPostCode}
        prefecture={rentPrefecture}
        city={rentCity}
        building={rentBuilding}
        setPostCode={setRentPostCode}
        setPrefecture={setRentPrefecture}
        setCity={setRentCity}
        setBuilding={setRentBuilding}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃料</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setRent(value)}
          value={rent}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>管理費</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setExpenses(value)}
          value={expenses}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>敷金</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setDepositAmount(value)}
          value={depositAmount}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>退去日（物件を明け渡した日）</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={leavingDate} setDate={setLeavingDate} />
    </>
  );
};

export default SecurityDeposit;
