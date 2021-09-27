import React, { FC } from 'react';
import { Button, Text } from 'react-native-elements';
import { ScrollView, View, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LendMoney from '../organisms/ContentsCertificatedMail/LendMoney';
import TrafficAccident from '../organisms/ContentsCertificatedMail/TrafficAccident';
import SecurityDeposit from '../organisms/ContentsCertificatedMail/SecurityDeposit';
import TradingValue from '../organisms/ContentsCertificatedMail/TradingValue';
import Information from '../organisms/ContentsCertificatedMail/Information';
import Salary from '../organisms/ContentsCertificatedMail/Salary';
import SNS from '../organisms/ContentsCertificatedMail/SNS';
import Bank from '../molecules/Bank';
import PersonInfoInputForm from '../organisms/PersonInfoInputForm';
import { styles } from '../../styles/form';
import {
  blankContentsCertifiedMailCommon,
  blankContentsCertifiedMailInformation,
  blankContentsCertifiedMailSalary,
  blankContentsCertifiedMailTradingValue,
  blankContentsCertifiedMailSecurityDeposit,
  blankContentsCertifiedMailTrafficAccident,
  blankContentsCertifiedMailLendMoney,
} from '../../models/contents-certified-mail';

type Props = {
  type: string;
};

const ContentsCertificatedMail: FC<Props> = ({ type }) => {
  const ref = firestore().collection('contentsCertificatedMail');
  const user = auth().currentUser;
  const common = blankContentsCertifiedMailCommon;
  const information = blankContentsCertifiedMailInformation;
  const salary = blankContentsCertifiedMailSalary;
  const tradingValue = blankContentsCertifiedMailTradingValue;
  const securityDeposit = blankContentsCertifiedMailSecurityDeposit;
  const trafficAccident = blankContentsCertifiedMailTrafficAccident;
  const lendMoney = blankContentsCertifiedMailLendMoney;
  const addDoc = async () => {
    await ref.add({
      ...common,
      ...lendMoney,
      user: user.uid,
    });
  };

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>内容証明郵便の対応期限</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          placeholder="10"
          value={common.dueDate}
          onChangeText={(value) => {
            common.dueDate = value;
          }}
        />
        <Text style={styles.text}>日以内</Text>
      </View>
      <Text style={styles.description}>
        振込先口座に関する情報を入力しましょう
      </Text>
      <Bank
        bank={common.bank}
        branch={common.branch}
        accountType={common.accountType}
        account={common.account}
        accountHolder={common.accountHolder}
      />
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

export default ContentsCertificatedMail;
