import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import TradingValueTemplate from '../ContentsCertificatedMail/TradingValue';
import DelayedDamage from '../../molecules/DelayedDamage';
import { styles } from '../../../styles/form';
import { ComplaintTradingValue } from '../../../models/complaint';

type Props = {
  model: ComplaintTradingValue;
};
const TradingValue: FC<Props> = ({ model }) => {
  return (
    <>
      <TradingValueTemplate model={model} />
      <DelayedDamage
        existsDelayPayment={model.existsDelayPayment}
        delayPayment={model.delayPayment}
        delayPaymentStartType={model.delayPaymentStartType}
        delayPaymentStartDate={model.delayPaymentStartDate}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>あなた（通告人）の事業内容</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInput}
          placeholder="酒類販売"
          value={model.business}
          onChangeText={(value) => (model.business = value)}
        />
        <Text style={styles.label}>業</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考事項</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="被告は、「代金はすでに支払った。」と主張して請求に応じない。"
        multiline={true}
        value={model.reference}
        onChangeText={(value) => (model.reference = value)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox
        title="契約書"
        checked={model.existsContract}
        onPress={() => (model.existsContract = !model.existsContract)}
      />
      <CheckBox
        title="受領証"
        checked={model.existsReceipt}
        onPress={() => (model.existsReceipt = !model.existsReceipt)}
      />
      <CheckBox
        title="請求書（控）"
        checked={model.existsInvoice}
        onPress={() => (model.existsInvoice = !model.existsInvoice)}
      />
      <CheckBox
        title="納品書（控）"
        checked={model.existsDeliveryNote}
        onPress={() => (model.existsDeliveryNote = !model.existsDeliveryNote)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={model.existsCertificate}
        onPress={() => (model.existsCertificate = !model.existsCertificate)}
      />
    </>
  );
};

export default TradingValue;
