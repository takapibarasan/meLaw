import React, { FC, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { View, TextInput, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Address from '../molecules/Address';
import PhoneNumber from '../molecules/PhoneNumber';
import Salary from '../organisms/Complaint/Salary';
import LendMoney from '../organisms/Complaint/LendMoney';
import TrafficAccident from '../organisms/Complaint/TrafficAccident';
import SecurityDeposit from '../organisms/Complaint/SecurityDeposit';
import TradingValue from '../organisms/Complaint/TradingValue';
import Information from '../organisms/Complaint/Information';
import SNS from '../organisms/Complaint/SNS';
import PersonInfoInputForm from '../organisms/PersonInfoInputForm';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStylesWide } from '../../styles/form';
import {
  blankComplaintCommon,
  blankComplaintInformation,
  blankComplaintSalary,
  blankComplaintTradingValue,
  blankComplaintSecurityDeposit,
  blankComplaintTrafficAccident,
  blankComplaintLendMoney,
} from '../../models/complaint';

type Props = {
  type: string;
};

const addressTypes = [
  { label: '上記住所（あなたの住所）', value: 1 },
  { label: '勤務先', value: 2 },
  { label: 'その他の場所', value: 3 },
];
const personTypes = [
  { label: '自分', value: 1 },
  { label: 'その他', value: 2 },
];
const lawsuitCounts = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
];
const Complaint: FC<Props> = ({ type }) => {
  let existsComaker = false;
  if (['返金請求', '損害賠償請求', '貸金返還請求'].includes(type))
    existsComaker = true;

  const ref = firestore().collection('complaint');
  const common = blankComplaintCommon;
  const information = blankComplaintInformation;
  const salary = blankComplaintSalary;
  const tradingValue = blankComplaintTradingValue;
  const securityDeposit = blankComplaintSecurityDeposit;
  const trafficAccident = blankComplaintTrafficAccident;
  const lendMoney = blankComplaintLendMoney;

  const addDoc = async () => {
    await ref.add({
      ...common,
      ...lendMoney,
    });
  };
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>
        本年の少額訴訟の回数を入力しましょう
      </Text>
      <RNPickerSelect
        onValueChange={(value) => (common.lawsuitCount = value)}
        items={lawsuitCounts}
        style={pickerSelectStylesWide}
        value={common.lawsuitCount}
      />
      <Text style={styles.description}>
        あなた（通告人）の情報を入力しましょう
      </Text>
      <PersonInfoInputForm
        name={common.name}
        postCode={common.postCode}
        prefecture={common.prefecture}
        city={common.city}
        building={common.building}
        company={common.company}
        position={common.position}
        businessType={common.businessType}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber phoneNumber={common.phoneNumber} />
      <Text style={styles.description}>
        書類の送達場所に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>書類の送達場所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => (common.mailingType = value)}
        items={addressTypes}
        style={pickerSelectStylesWide}
        value={common.mailingType}
      />
      {[2, 3].includes(common.mailingType) ? (
        <>
          {common.mailingType === 3 ? (
            <>
              <Text style={styles.label}>あなたとの関係</Text>
              <TextInput
                style={styles.textInput}
                placeholder="父の家"
                value={common.mailingDescription}
                onChangeText={(value) => (common.mailingDescription = value)}
              />
            </>
          ) : (
            <>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>勤務先名称</Text>
                <Text style={styles.required}>必須</Text>
              </View>
              <TextInput
                style={styles.textInputWide}
                value={common.mailingCompany}
                onChangeText={(value) => (common.mailingCompany = value)}
              />
            </>
          )}
          <Address
            postCode={common.mailingPostCode}
            prefecture={common.mailingPrefecture}
            city={common.mailingCity}
            building={common.mailingBuilding}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>電話番号</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <PhoneNumber phoneNumber={common.mailingPhoneNumber} />
        </>
      ) : null}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>書類の受取人</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => (common.recipientType = value)}
        items={personTypes}
        style={pickerSelectStylesWide}
        value={common.recipientType}
      />
      {common.recipientType === 2 ? (
        <>
          <Text style={styles.label}>書類の受取人名</Text>
          <TextInput
            style={styles.textInput}
            value={common.recipientName}
            onChangeText={(value) => (common.recipientName = value)}
          />
        </>
      ) : null}
      <Text style={styles.description}>
        相手方（被通告人）の情報を入力しましょう
      </Text>
      <PersonInfoInputForm
        name={common.oppositeName}
        postCode={common.oppositePostCode}
        prefecture={common.oppositePrefecture}
        city={common.oppositeCity}
        building={common.oppositeBuilding}
        company={common.oppositeCompany}
        position={common.oppositePosition}
        businessType={common.oppositeBusinessType}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber phoneNumber={common.oppositePhoneNumber} />
      {existsComaker ? (
        <>
          <Text style={styles.description}>
            相手方（2人目）がいれば、情報を入力しましょう
          </Text>
          <PersonInfoInputForm
            name={common.opposite2Name}
            postCode={common.opposite2PostCode}
            prefecture={common.opposite2Prefecture}
            city={common.opposite2City}
            building={common.opposite2Building}
            company={common.opposite2Company}
            position={common.opposite2Position}
            businessType={common.opposite2BusinessType}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>電話番号</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <PhoneNumber phoneNumber={common.opposite2PhoneNumber} />
        </>
      ) : (
        <></>
      )}
      {type === '誹謗中傷' ? <SNS /> : <></>}
      {type === '返金請求' ? <Information model={information} /> : <></>}
      {type === '給料請求' ? <Salary model={salary} /> : <></>}
      {type === '売買代金請求' ? <TradingValue model={tradingValue} /> : <></>}
      {type === '敷金返還請求' ? (
        <SecurityDeposit model={securityDeposit} />
      ) : (
        <></>
      )}
      {type === '損害賠償請求' ? (
        <TrafficAccident model={trafficAccident} />
      ) : (
        <></>
      )}
      {type === '貸金返還請求' ? <LendMoney model={lendMoney} /> : <></>}
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
