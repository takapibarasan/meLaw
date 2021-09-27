import React, { FC } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { styles, pickerSelectStylesWide } from '../../../styles/form';
import RNPickerSelect from 'react-native-picker-select';
import DateTemplate from '../../molecules/Date';
import { ContentsCertifiedMailInformation } from '../../../models/contents-certified-mail';

const coolingOffTypes = [
  {
    label: '法的書面を受け取ってから20日間以内',
    value: 1,
  },
  { label: '法的書面を受け取っていない', value: 2 },
];

type Props = {
  model: ContentsCertifiedMailInformation;
};
const Information: FC<Props> = ({ model }) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>会社名</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        value={model.informationCompany}
        onChangeText={(value) => {
          model.informationCompany = value;
        }}
      />
      <Text style={styles.description}>
        契約条件に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>サービス名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        value={model.service}
        onChangeText={(value) => {
          model.service = value;
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>購入日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={model.salesDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>購入金額</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.salesAmount}
          onChangeText={(value) => {
            model.salesAmount = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>クーリングオフ制度を主張する根拠</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => {
          model.coolingOffType = value;
        }}
        items={coolingOffTypes}
        style={pickerSelectStylesWide}
        value={model.coolingOffType}
      />
    </>
  );
};

export default Information;
