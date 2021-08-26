import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import DelayedDamage from '../../molecules/DelayedDamage';
import InformationTemplate from '../ContentsCertificatedMail/Information';
import Duration from '../../molecules/Duration';
import { styles } from '../../../styles/form';

const Information: FC = () => {
  return (
    <>
      <InformationTemplate />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利率</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>年</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
        />
        <Text style={styles.text}>%</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利息の支払期間</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Duration />
      <DelayedDamage />
      <CheckBox title="仮執行の有無" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
    </>
  );
};

export default Information;
