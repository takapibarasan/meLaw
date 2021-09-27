import React, { FC } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Address from '../../molecules/Address';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import { ContentsCertifiedMailSecurityDeposit } from '../../../models/contents-certified-mail';

type Props = {
  model: ContentsCertifiedMailSecurityDeposit;
};
const SecurityDeposit: FC<Props> = ({ model }) => {
  return (
    <>
      <Text style={styles.description}>
        賃貸条件に関する情報を入力しましょう
      </Text>
      <Address
        postCode={model.rentPostCode}
        prefecture={model.rentPrefecture}
        city={model.rentCity}
        building={model.rentBuilding}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃料</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.rent}
          onChangeText={(value) => {
            model.rent = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>管理費</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.expenses}
          onChangeText={(value) => {
            model.expenses = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>敷金</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.depositAmount}
          onChangeText={(value) => {
            model.depositAmount = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>退去日（物件を明け渡した日）</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={model.leavingDate} />
    </>
  );
};

export default SecurityDeposit;
