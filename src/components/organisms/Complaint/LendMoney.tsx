import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { StyleSheet, View, TextInput } from 'react-native';
import Duration from '../../molecules/Duration';
import Date from '../../molecules/Date';
import LendMoneyTemplate from '../ContentsCertificatedMail/LendMoney';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../../styles/form';

const delayedDamageStartDate = [
  { label: '訴状送達の日の翌日', value: '訴状送達の日の翌日' },
  { label: 'その他', value: 'その他' },
];
const LendMoney: FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <LendMoneyTemplate />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利息の支払期間</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Duration />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害金の発生開始日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => {
          if (value == 'その他') setExpanded(true);
          else setExpanded(false);
        }}
        items={delayedDamageStartDate}
        style={pickerSelectStyles}
      />
      <View style={expanded ? { display: 'flex' } : { display: 'none' }}>
        <Date />
      </View>
      <CheckBox title="仮執行の有無" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の特約</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="返済金は、元本、利息、遅延損害金の順に充当する"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="被告らは自動車の修理代金を相殺したと言って支払おうとしない"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox title="契約書" />
      <CheckBox title="借用書" />
      <CheckBox title="念書" />
      <CheckBox title="登記事項証明書（商業登記簿謄本）" />
    </>
  );
};

export default LendMoney;
