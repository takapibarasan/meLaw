import React, { FC } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import DelayedDamage from '../../molecules/DelayedDamage';
import SecurityDepositTemplate from '../ContentsCertificatedMail/SecurityDeposit';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import { ComplaintSecurityDeposit } from '../../../models/complaint';

type Props = {
  model: ComplaintSecurityDeposit;
};
const SecurityDeposit: FC<Props> = ({ model }) => {
  return (
    <>
      <SecurityDepositTemplate model={model} />
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
      <Text style={styles.label}>契約日</Text>
      <DateTemplate date={model.contractDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃借期間</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          value={model.leasePeriod}
          onChangeText={(value) => (model.leasePeriod = value)}
        />
        <Text style={styles.text}>年</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>敷金返還についての約定</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="建物明渡しの1ヶ月後に返還する。"
        value={model.agreement}
        onChangeText={(value) => (model.agreement = value)}
      />
      <Text style={styles.label}>賃貸借契約終了日</Text>
      <DateTemplate date={model.contractEndDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="被告は、敷金をリフォーム費用に充当したので、返すべき敷金はないと言って支払おうとしない。"
        multiline={true}
        value={model.reference}
        onChangeText={(value) => (model.reference = value)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox
        title="賃貸借契約書"
        checked={model.existsContract}
        onPress={() => (model.existsContract = !model.existsContract)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={model.existsCertificate}
        onPress={() => (model.existsCertificate = !model.existsCertificate)}
      />
      <CheckBox
        title="内容証明郵便"
        checked={model.existsContentsCertifiedMail}
        onPress={() =>
          (model.existsContentsCertifiedMail =
            !model.existsContentsCertifiedMail)
        }
      />
      <CheckBox
        title="配達証明書"
        checked={model.existsDeliveryCertificate}
        onPress={() =>
          (model.existsDeliveryCertificate = !model.existsDeliveryCertificate)
        }
      />
      <CheckBox
        title="敷金領収書"
        checked={model.existsReceipt}
        onPress={() => (model.existsReceipt = !model.existsReceipt)}
      />
    </>
  );
};

export default SecurityDeposit;
