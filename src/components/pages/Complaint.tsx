import React, { FC, useState } from 'react';
import { Text, Input, Button } from 'react-native-elements';
import { View, TextInput, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Name from '../molecules/Name';
import Address from '../molecules/Address';
import PhoneNumber from '../molecules/PhoneNumber';
import Salary from '../organisms/Complaint/Salary';
import LendMoney from '../organisms/Complaint/LendMoney';
import TrafficAccident from '../organisms/Complaint/TrafficAccident';
import SecurityDeposit from '../organisms/Complaint/SecurityDeposit';
import TradingValue from '../organisms/Complaint/TradingValue';
import Information from '../organisms/Complaint/Information';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../styles/form';

type Props = {
  type: string;
};

const addressType = [
  { label: '上記住所', value: '上記住所' },
  { label: '勤務先', value: '勤務先' },
  { label: 'その他の場所', value: 'その他の場所' },
];
const personType = [
  { label: '自分', value: '自分' },
  { label: 'その他', value: 'その他' },
];
const Complaint: FC<Props> = ({ type }) => {
  const [doc, setDoc] = useState('');
  const ref = firestore().collection('todos');
  const [expanded, setExpanded] = React.useState(false);
  const [isAnotherAddress, setIsAnotherAddress] = React.useState(false);
  const [isAnotherPerson, setIsAnotherPerson] = React.useState(false);
  let existsComaker = false;
  if (
    ['返金請求', '敷金返還請求', '損害賠償請求', '貸金返還請求'].includes(type)
  )
    existsComaker = true;

  const addDoc = async () => {
    await ref.add({
      title: doc,
      complete: false,
    });
    setDoc('');
  };
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>あなたの情報を入力しましょう</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>氏名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Name />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>FAX</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber />
      <Text style={styles.description}>
        書類の送達場所に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>書類の送達場所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => {
          if (['勤務先', 'その他の場所'].includes(value)) setExpanded(true);
          else setExpanded(false);

          if (value == 'その他の場所') setIsAnotherAddress(true);
          else setIsAnotherAddress(false);
        }}
        items={addressType}
        style={pickerSelectStyles}
      />
      <View style={expanded ? { display: 'flex' } : { display: 'none' }}>
        <Address />
        <PhoneNumber />
      </View>
      <View
        style={isAnotherAddress ? { display: 'flex' } : { display: 'none' }}
      >
        <Text style={styles.label}>あなたとの関係</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>書類の受取人</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => {
          if (value == 'その他') setIsAnotherPerson(true);
          else setIsAnotherPerson(false);
        }}
        items={personType}
        style={pickerSelectStyles}
      />
      <View style={isAnotherPerson ? { display: 'flex' } : { display: 'none' }}>
        <Text style={styles.label}>書類の受取人名</Text>
        <TextInput style={styles.textInput} />
      </View>
      <Text style={styles.description}>相手方の情報を入力しましょう </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>氏名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Name />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>FAX</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber />
      <Text style={styles.description}>
        相手方の勤務先に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>勤務先名称</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput style={styles.textInputWide} />
      <Address />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber />
      {existsComaker ? (
        <>
          <Text style={styles.description}>
            相手方（2人目）の情報を入力しましょう
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>氏名</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <Name />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>住所</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <Address />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>電話番号</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <PhoneNumber />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>FAX</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <PhoneNumber />
          <Text style={styles.description}>
            相手方（2人目）の勤務先に関する情報を入力しましょう
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>勤務先名称</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <TextInput style={styles.textInputWide} />
          <Address />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>電話番号</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <PhoneNumber />
        </>
      ) : (
        <></>
      )}
      {type == '返金請求' ? <Information /> : <></>}
      {type == '賃金請求' ? <Salary /> : <></>}
      {type == '売買代金請求' ? <TradingValue /> : <></>}
      {type == '敷金返還請求' ? <SecurityDeposit /> : <></>}
      {type == '損害賠償請求' ? <TrafficAccident /> : <></>}
      {type == '貸金返還請求' ? <LendMoney /> : <></>}
      <Input label={'New Todo'} value={doc} onChangeText={setDoc} />
      <Button
        title="保存"
        type="solid"
        buttonStyle={styles.button}
        raised
        onPress={() => addDoc()}
      />
    </ScrollView>
  );
};

export default Complaint;
