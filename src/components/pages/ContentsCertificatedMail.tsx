import React, { FC, useEffect, useState } from 'react';
import { Button, Text } from 'react-native-elements';
import { ScrollView, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LendMoney from '../organisms/ContentsCertificatedMail/LendMoney';
import TrafficAccident from '../organisms/ContentsCertificatedMail/TrafficAccident';
import SecurityDeposit from '../organisms/ContentsCertificatedMail/SecurityDeposit';
import TradingValue from '../organisms/ContentsCertificatedMail/TradingValue';
import Information from '../organisms/ContentsCertificatedMail/Information';
import Salary from '../organisms/ContentsCertificatedMail/Salary';
import Bank from '../molecules/Bank';
import Name from '../molecules/Name';
import Address from '../molecules/Address';
import { styles } from '../../styles/form';

type Props = {
  type: string;
};

const ContentsCertificatedMail: FC<Props> = ({ type }) => {
  const [doc, setDoc] = useState<string>('');
  const ref = firestore().collection('todos');

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
      {type == '返金請求' ? <Information /> : <></>}
      {type == '賃金請求' ? <Salary /> : <></>}
      {type == '売買代金請求' ? <TradingValue /> : <></>}
      {type == '敷金返還請求' ? <SecurityDeposit /> : <></>}
      {type == '損害賠償請求' ? <TrafficAccident /> : <></>}
      {type == '貸金返還請求' ? <LendMoney /> : <></>}
      <Text style={styles.description}>
        振込先口座に関する情報を入力しましょう
      </Text>
      <Bank />
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
