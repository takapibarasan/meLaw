import React, { FC } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import { ContentsCertifiedMailTradingValue } from '../../../models/contents-certified-mail';

type Props = {
  model: ContentsCertifiedMailTradingValue;
};
const TradingValue: FC<Props> = ({ model }) => {
  return (
    <>
      <Text style={styles.description}>
        販売条件に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>商品名と数量</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="ビール1ケース、ウイスキー2本"
        value={model.product}
        onChangeText={(value) => {
          model.product = value;
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売日時</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={model.salesDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>販売金額</Text>
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
        <Text style={styles.label}>支払期限</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <DateTemplate date={model.paymentDueDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>支払済の金額</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.paidAmount}
          onChangeText={(value) => {
            model.paidAmount = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default TradingValue;
