import React, { FC } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import TrafficAccidentTemplate from '../ContentsCertificatedMail/TrafficAccident';
import DelayedDamage from '../../molecules/DelayedDamage';
import { styles } from '../../../styles/form';
import { ComplaintTrafficAccident } from '../../../models/complaint';

type Props = {
  model: ComplaintTrafficAccident;
};
const TrafficAccident: FC<Props> = ({ model }) => {
  return (
    <>
      <TrafficAccidentTemplate model={model} />
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
        <Text style={styles.label}>事故の状況</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="交差点手前の停止線で原告運転の車が停止していたところ、後ろから来て前をよく見ていなかった被告1運転の車が原告運転の車の後部に衝突し、原告運転の車の後部バンパーやバックライト部分がこわれた"
        multiline={true}
        value={model.accidentDescription}
        onChangeText={(value) => (model.accidentDescription = value)}
      />
      <CheckBox
        title="相手方1は、相手方2の使用者である。"
        checked={model.isEmployer}
        onPress={() => (model.isEmployer = !model.isEmployer)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="被告らは、被告2が掛けている保険で原告が運転していた車の修理代金などを支払うと約束していたのに現在まで全く支払おうとしない"
        multiline={true}
        value={model.reference}
        onChangeText={(value) => (model.reference = value)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox
        title="交通事故証明書"
        checked={model.existsAccidentCertificate}
        onPress={() =>
          (model.existsAccidentCertificate = !model.existsAccidentCertificate)
        }
      />
      <CheckBox
        title="示談書・念書"
        checked={model.existsMemorandum}
        onPress={() => (model.existsMemorandum = !model.existsMemorandum)}
      />
      <CheckBox
        title="車等の損傷部分の写真"
        checked={model.existsPhoto}
        onPress={() => (model.existsPhoto = !model.existsPhoto)}
      />
      <CheckBox
        title="領収書"
        checked={model.existsReceipt}
        onPress={() => (model.existsReceipt = !model.existsReceipt)}
      />
      <CheckBox
        title="車等の修理代金見積書"
        checked={model.existsEstimate}
        onPress={() => (model.existsEstimate = !model.existsEstimate)}
      />
      <CheckBox
        title="事故状況説明図"
        checked={model.existsDiagram}
        onPress={() => (model.existsDiagram = !model.existsDiagram)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={model.existsCertificate}
        onPress={() => (model.existsCertificate = !model.existsCertificate)}
      />
    </>
  );
};

export default TrafficAccident;
