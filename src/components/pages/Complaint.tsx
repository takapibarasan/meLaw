import React, { FC, useState } from 'react';
import { Text, Input, Button } from 'react-native-elements';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Name from '../molecules/Name';
import Address from '../molecules/Address';
import PhoneNumber from '../molecules/PhoneNumber';
import Fax from '../molecules/Fax';
import Salary from '../organisms/Complaint/Salary';
import LendMoney from '../organisms/Complaint/LendMoney';
import TrafficAccident from '../organisms/Complaint/TrafficAccident';
import SecurityDeposit from '../organisms/Complaint/SecurityDeposit';
import TradingValue from '../organisms/Complaint/TradingValue';
import Information from '../organisms/Complaint/Information';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  descriptionAttention: {
    marginTop: 40,
    color: '#EB5757',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  labelAttention: {
    marginTop: 30,
    color: '#EB5757',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  descriptionAny: {
    marginTop: 40,
    color: '#4682b4',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#4682b4',
  },
  textInput: {
    fontSize: 16,
    width: 180,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  textInputWide: {
    fontSize: 16,
    width: 360,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  wrapper: {
    height: '100%',
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#EB5757',
    marginBottom: 50,
    alignSelf: 'center',
    width: 140,
    padding: 14,
  },
  description: {
    fontSize: 20,
    marginTop: 40,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  numberInput: {
    fontSize: 16,
    width: 40,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  numberInputWide: {
    fontSize: 16,
    width: 120,
    backgroundColor: 'white',
    height: 40,
    marginRight: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  text: {
    color: '#333333',
    fontSize: 16,
    marginTop: 12,
  },
  label: {
    color: '#333333',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginRight: 40,
    height: 40,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 160,
    marginLeft: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 160,
    backgroundColor: '#eee',
    marginLeft: 20,
  },
});

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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>あなたの情報を入力しましょう</Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <Name />
      <Address />
      <PhoneNumber />
      <Fax />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>
          書類の送達場所に関する情報を入力しましょう
        </Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <Text style={styles.label}>書類の送達場所</Text>
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
      <Text style={styles.label}>書類の受取人</Text>
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>相手方の情報を入力しましょう </Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <Name />
      <Address />
      <PhoneNumber />
      <Fax />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>
          相手方の勤務先に関する情報を入力しましょう{' '}
        </Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <Text style={styles.label}>勤務先名称</Text>
      <TextInput style={styles.textInputWide} />
      <Address />
      <PhoneNumber />
      {existsComaker ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.description}>
              相手方（2人目）の情報を入力しましょう{' '}
            </Text>
            <Text style={styles.descriptionAny}>任意</Text>
          </View>
          <Name />
          <Address />
          <PhoneNumber />
          <Fax />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.description}>
              相手方（2人目）の勤務先に関する情報を入力しましょう
            </Text>
            <Text style={styles.descriptionAttention}>必須</Text>
          </View>
          <Text style={styles.label}>勤務先名称</Text>
          <TextInput style={styles.textInputWide} />
          <Address />
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
