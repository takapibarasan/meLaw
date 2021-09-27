import React, { FC } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Duration from '../../molecules/Duration';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import { ContentsCertifiedMailSalary } from '../../../models/contents-certified-mail';

type Props = {
  model: ContentsCertifiedMailSalary;
};
const Salary: FC<Props> = ({ model }) => {
  return (
    <>
      <Text style={styles.description}>
        契約条件に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>勤務開始日</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={model.workStartDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>給料未払期間</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Duration
        startDate={model.unpaidSalaryStartDate}
        endDate={model.unpaidSalaryEndDate}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>給料未払総額</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.unpaidSalary}
          onChangeText={(value) => {
            model.unpaidSalary = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default Salary;
