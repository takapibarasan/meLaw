import React, { FC, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import SalaryTemplate from '../ContentsCertificatedMail/Salary';
import DelayedDamage from '../../molecules/DelayedDamage';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

const salaryTypes = [
  { label: '月給', value: 1 },
  { label: '日給', value: 2 },
  { label: '時給', value: 3 },
];

type Props = {
  workStartDate: firebase.firestore.Timestamp | null;
  unpaidSalaryStartDate: firebase.firestore.Timestamp | null;
  unpaidSalaryEndDate: firebase.firestore.Timestamp | null;
  unpaidSalary: string;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  execute: boolean;
  business: string;
  job: string;
  workEndDate: firebase.firestore.Timestamp | null;
  salaryType: number;
  salaryAmount: string;
  paymentDueDay: string;
  closingMonth: string;
  closingDay: string;
  reference: string;
  existsStatement: boolean;
  existsCertificate: boolean;
  setWorkStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setUnpaidSalaryStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setUnpaidSalaryEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setUnpaidSalary: React.Dispatch<React.SetStateAction<string>>;
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  setBusiness: React.Dispatch<React.SetStateAction<string>>;
  setJob: React.Dispatch<React.SetStateAction<string>>;
  setWorkEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setSalaryType: React.Dispatch<React.SetStateAction<number>>;
  setSalaryAmount: React.Dispatch<React.SetStateAction<string>>;
  setPaymentDueDay: React.Dispatch<React.SetStateAction<string>>;
  setClosingMonth: React.Dispatch<React.SetStateAction<string>>;
  setClosingDay: React.Dispatch<React.SetStateAction<string>>;
  setReference: React.Dispatch<React.SetStateAction<string>>;
  setExistsStatement: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsCertificate: React.Dispatch<React.SetStateAction<boolean>>;
};
const Salary: FC<Props> = ({
  workStartDate,
  unpaidSalaryStartDate,
  unpaidSalaryEndDate,
  unpaidSalary,
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
  execute,
  business,
  job,
  workEndDate,
  salaryType,
  salaryAmount,
  paymentDueDay,
  closingMonth,
  closingDay,
  reference,
  existsStatement,
  existsCertificate,
  setWorkStartDate,
  setUnpaidSalaryStartDate,
  setUnpaidSalaryEndDate,
  setUnpaidSalary,
  setExistsDelayPayment,
  setDelayPayment,
  setDelayPaymentStartType,
  setDelayPaymentStartDate,
  setExecute,
  setBusiness,
  setJob,
  setWorkEndDate,
  setSalaryType,
  setSalaryAmount,
  setPaymentDueDay,
  setClosingMonth,
  setClosingDay,
  setReference,
  setExistsStatement,
  setExistsCertificate,
}) => {
  return (
    <>
      <SalaryTemplate
        workStartDate={workStartDate}
        unpaidSalaryStartDate={unpaidSalaryStartDate}
        unpaidSalaryEndDate={unpaidSalaryEndDate}
        unpaidSalary={unpaidSalary}
        setWorkStartDate={setWorkStartDate}
        setUnpaidSalaryStartDate={setUnpaidSalaryStartDate}
        setUnpaidSalaryEndDate={setUnpaidSalaryEndDate}
        setUnpaidSalary={setUnpaidSalary}
      />
      <DelayedDamage
        existsDelayPayment={existsDelayPayment}
        delayPayment={delayPayment}
        delayPaymentStartType={delayPaymentStartType}
        delayPaymentStartDate={delayPaymentStartDate}
        setExistsDelayPayment={setExistsDelayPayment}
        setDelayPayment={setDelayPayment}
        setDelayPaymentStartType={setDelayPaymentStartType}
        setDelayPaymentStartDate={setDelayPaymentStartDate}
      />
      <CheckBox
        containerStyle={{ marginTop: 40 }}
        title="仮執行の有無"
        checked={execute}
        onPress={() => setExecute(!execute)}
      />
      <Text style={styles.inputDescription}>
        この事件の判決が確定する前に判決の内容に基づいて強制執行をしたいときにはチェックしてください。
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事業内容</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        onChangeText={(value) => setBusiness(value)}
        value={business}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>仕事の内容</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        multiline={true}
        style={styles.textarea}
        placeholder="ダイレクトメールの宛名書きや書類のコピー等"
        onChangeText={(value) => setJob(value)}
        value={job}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>給料</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RNPickerSelect
          onValueChange={(value) => setSalaryType(value)}
          items={salaryTypes}
          style={pickerSelectStyles}
          value={salaryType}
        />
        <TextInput
          style={[styles.numberInputWide, { marginLeft: 20 }]}
          keyboardType="numeric"
          onChangeText={(value) => setSalaryAmount(value)}
          value={salaryAmount}
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
          keyboardType="numeric"
          onChangeText={(value) => setPaymentDueDay(value)}
          value={paymentDueDay}
        />
        <Text style={styles.text}>日</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 20 }}>
        <Text style={styles.text}>（</Text>
        <TextInput
          style={styles.numberInput}
          placeholder="翌"
          onChangeText={(value) => setClosingMonth(value)}
          value={closingMonth}
        />
        <Text style={styles.text}>月</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="numeric"
          onChangeText={(value) => setClosingDay(value)}
          value={closingDay}
        />
        <Text style={styles.text}>日締め）</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>勤務終了日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={workEndDate} setDate={setWorkEndDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考事項</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        その他の参考事項（相手方が返済しない理由や相手の言い分など、この紛争について他に参考になること）を記載ください。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="資金繰りが苦しいから待ってくれとのことだったがその後も私が怠けていたなどと言って払ってくれません。"
        multiline={true}
        onChangeText={(value) => setReference(value)}
        value={reference}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        以下の証拠書類があればチェックください。それぞれの添付書類は写しを2通（相手方が2名のときは3通）
        準備して、訴状と一緒に提出ください。
      </Text>
      <CheckBox
        title="給与等支払明細書"
        checked={existsStatement}
        onPress={() => setExistsStatement(!existsStatement)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={existsCertificate}
        onPress={() => setExistsCertificate(!existsCertificate)}
      />
    </>
  );
};

export default Salary;
