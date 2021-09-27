import React, { FC } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Duration from '../../molecules/Duration';
import LendMoneyTemplate from '../ContentsCertificatedMail/LendMoney';
import { styles } from '../../../styles/form';
import { ComplaintLendMoney } from '../../../models/complaint';

type Props = {
  model: ComplaintLendMoney;
};
const LendMoney: FC<Props> = ({ model }) => {
  return (
    <>
      <LendMoneyTemplate model={model} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利息の支払期間</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Duration
        startDate={model.interestStartDate}
        endDate={model.interestEndDate}
      />
      <CheckBox
        title="仮執行の有無"
        checked={model.execute}
        onPress={() => (model.execute = !model.execute)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の特約</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="返済金は、元本、利息、遅延損害金の順に充当する"
        multiline={true}
        value={model.agreement}
        onChangeText={(value) => (model.agreement = value)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考事項</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="被告らは自動車の修理代金を相殺したと言って支払おうとしない"
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
        title="借用書"
        checked={model.existsAcknowledgement}
        onPress={() =>
          (model.existsAcknowledgement = !model.existsAcknowledgement)
        }
      />
      <CheckBox
        title="念書"
        checked={model.existsMemorandum}
        onPress={() => (model.existsMemorandum = !model.existsMemorandum)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={model.existsCertificate}
        onPress={() => (model.existsCertificate = !model.existsCertificate)}
      />
    </>
  );
};

export default LendMoney;
