import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import TradingValueTemplate from '../ContentsCertificatedMail/TradingValue';
import DelayedDamage from '../../molecules/DelayedDamage';
import { styles } from '../../../styles/form';

const LendMoney: FC = () => {
  return (
    <>
      <TradingValueTemplate />
      <DelayedDamage />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>あなたの事業内容</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput style={styles.textInput} placeholder="酒類販売" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="被告は、「代金はすでに支払った。」と主張して請求に応じない。"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox title="契約書" />
      <CheckBox title="受領証" />
      <CheckBox title="請求書（控）" />
      <CheckBox title="納品書（控）" />
      <CheckBox title="登記事項証明書（商業登記簿謄本）" />
    </>
  );
};

export default LendMoney;
