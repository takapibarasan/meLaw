import React, { FC } from 'react';
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
};
const Bank: FC<Props> = ({
  bank,
  branch,
  accountType,
  account,
  accountHolder,
}) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>金融機関名</Text>
        <Text style={[styles.label, { marginLeft: 85 }]}>支店名</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInputNarrow}
          value={bank}
          onChangeText={(value) => {
            bank = value;
          }}
        />
        <TextInput
          style={styles.textInputNarrow}
          value={branch}
          onChangeText={(value) => {
            branch = value;
          }}
        />
      </View>
      <Text style={styles.label}>口座種別</Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <RadioButton.Item
          value="first"
          label="普通預金"
          status={accountType === '普通預金' ? 'checked' : 'unchecked'}
          onPress={() => (accountType = '普通預金')}
        />
        <RadioButton.Item
          value="second"
          label="当座預金"
          status={accountType === '当座預金' ? 'checked' : 'unchecked'}
          onPress={() => (accountType = '当座預金')}
        />
      </View>
      <Text style={styles.label}>口座番号</Text>
      <TextInput
        style={styles.textInput}
        maxLength={7}
        keyboardType="numeric"
        value={account}
        onChangeText={(value) => {
          account = value;
        }}
      />
      <Text style={styles.label}>口座名義人名（カナ）</Text>
      <TextInput
        style={styles.textInput}
        value={accountHolder}
        onChangeText={(value) => {
          accountHolder = value;
        }}
      />
    </>
  );
};

export default Bank;
