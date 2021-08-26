import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { StyleSheet, View, TextInput } from 'react-native';
import Duration from '../../molecules/Duration';
import SalaryTemplate from '../ContentsCertificatedMail/Salary';
import DelayedDamage from '../../molecules/DelayedDamage';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../../styles/form';

const salaryType = [
  { label: '月給', value: '月給' },
  { label: '日給', value: '日給' },
  { label: '時給', value: '時給' },
];
const Salary: FC = () => {
  return (
    <>
      <SalaryTemplate />
      <DelayedDamage />
      <CheckBox title="仮執行の有無" />

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事業内容</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput style={styles.textInputWide} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>仕事の内容</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="ダイレクトメールの宛名書きや書類のコピー等"
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>給料</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => {}}
        items={salaryType}
        style={pickerSelectStyles}
      />
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>支払期日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>毎月</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>日</Text>
        <TextInput style={styles.numberInput} maxLength={1} placeholder="翌" />
        <Text style={styles.text}>月</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>日締め</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>働いていた期間</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Duration />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="資金繰りが苦しいから待ってくれとのことだったがその後も私が怠けていたなどと言って払ってくれません。"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox title="給与等支払明細書" />
      <CheckBox title="登記事項証明書（商業登記簿謄本）" />
    </>
  );
};

export default Salary;
