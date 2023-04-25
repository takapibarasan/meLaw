import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles } from '../../styles/form';

type Props = {
  bank: string;
  branch: string;
  accountType: string;
  account: string;
  accountHolder: string;
  setBank: React.Dispatch<React.SetStateAction<string>>;
  setBranch: React.Dispatch<React.SetStateAction<string>>;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  setAccountHolder: React.Dispatch<React.SetStateAction<string>>;
};
const Bank: FC<Props> = ({
  bank,
  branch,
  accountType,
  account,
  accountHolder,
  setBank,
  setBranch,
  setAccountType,
  setAccount,
  setAccountHolder,
}) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>金融機関名</Text>
        <Text style={styles.required}>必須</Text>
        <Text style={[styles.label, { marginLeft: 50 }]}>支店名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInputNarrow}
          onChangeText={(value) => setBank(value)}
          value={bank}
        />
        <TextInput
          style={styles.textInputNarrow}
          onChangeText={(value) => setBranch(value)}
          value={branch}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>口座種別</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <RadioButton.Item
          value="普通預金"
          label="普通預金"
          status={accountType === '普通預金' ? 'checked' : 'unchecked'}
          onPress={() => setAccountType('普通預金')}
        />
        <RadioButton.Item
          value="当座預金"
          label="当座預金"
          status={accountType === '当座預金' ? 'checked' : 'unchecked'}
          onPress={() => setAccountType('当座預金')}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>口座番号</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        maxLength={7}
        keyboardType="numeric"
        onChangeText={(value) => setAccount(value)}
        value={account}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>口座名義人名（カナ）</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setAccountHolder(value)}
        value={accountHolder}
      />
    </>
  );
};

export default Bank;
