import React, { FC } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import SalaryTemplate from '../ContentsCertificatedMail/Salary';
import DelayedDamage from '../../molecules/DelayedDamage';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStylesWide } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import { ComplaintSalary } from '../../../models/complaint';

const salaryTypes = [
  { label: '月給', value: 1 },
  { label: '日給', value: 2 },
  { label: '時給', value: 3 },
];

type Props = {
  model: ComplaintSalary;
};
const Salary: FC<Props> = ({ model }) => {
  return (
    <>
      <SalaryTemplate model={model} />
      <DelayedDamage
        existsDelayPayment={model.existsDelayPayment}
        delayPayment={model.delayPayment}
        delayPaymentStartType={model.delayPaymentStartType}
        delayPaymentStartDate={model.delayPaymentStartDate}
      />
      <CheckBox
        title="仮執行の有無"
        checked={model.execute}
        onPress={() => (model.execute = !model.execute)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事業内容</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        value={model.business}
        onChangeText={(value) => (model.business = value)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>仕事の内容</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="ダイレクトメールの宛名書きや書類のコピー等"
        value={model.job}
        onChangeText={(value) => (model.job = value)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>給料</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => (model.salaryType = value)}
        items={salaryTypes}
        style={pickerSelectStylesWide}
        value={model.salaryType}
      />
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.salaryAmount}
          onChangeText={(value) => (model.salaryAmount = value)}
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
          maxLength={2}
          keyboardType="numeric"
          value={model.paymentDueDay}
          onChangeText={(value) => (model.paymentDueDay = value)}
        />
        <Text style={styles.text}>日（</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={1}
          placeholder="翌"
          value={model.closingMonth}
          onChangeText={(value) => (model.closingMonth = value)}
        />
        <Text style={styles.text}>月</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="numeric"
          value={model.closingDay}
          onChangeText={(value) => (model.closingDay = value)}
        />
        <Text style={styles.text}>日締め）</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>勤務終了日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={model.workEndDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考事項</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="資金繰りが苦しいから待ってくれとのことだったがその後も私が怠けていたなどと言って払ってくれません。"
        multiline={true}
        value={model.reference}
        onChangeText={(value) => (model.reference = value)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox
        title="給与等支払明細書"
        checked={model.existsStatement}
        onPress={() => (model.existsStatement = !model.existsStatement)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={model.existsCertificate}
        onPress={() => (model.existsCertificate = !model.existsCertificate)}
      />
    </>
  );
};

export default Salary;
