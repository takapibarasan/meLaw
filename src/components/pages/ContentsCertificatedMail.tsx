import React, { FC, useEffect, useState } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import { StyleSheet, ScrollView, View } from 'react-native';
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
    marginTop: 40,
  },
  description: {
    fontSize: 20,
    marginTop: 40,
    marginLeft: 20,
    fontWeight: 'bold',
  },
});

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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>あなたの情報を入力しましょう</Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <Name />
      <Address />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>相手方の情報を入力しましょう </Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
      <Name />
      <Address />
      {type == '返金請求' ? <Information /> : <></>}
      {type == '賃金請求' ? <Salary /> : <></>}
      {type == '売買代金請求' ? <TradingValue /> : <></>}
      {type == '敷金返還請求' ? <SecurityDeposit /> : <></>}
      {type == '損害賠償請求' ? <TrafficAccident /> : <></>}
      {type == '貸金返還請求' ? <LendMoney /> : <></>}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.description}>
          振込先口座に関する情報を入力しましょう
        </Text>
        <Text style={styles.descriptionAttention}>必須</Text>
      </View>
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
