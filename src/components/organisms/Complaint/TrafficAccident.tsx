import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import TrafficAccidentTemplate from '../ContentsCertificatedMail/TrafficAccident';
import DelayedDamage from '../../molecules/DelayedDamage';
import { styles, pickerSelectStyles } from '../../../styles/form';

const vehicleType = [
  { label: '普通乗用自動車', value: '0' },
  { label: '普通貨物自動車', value: '0' },
  { label: '自動二輪車', value: '0' },
  { label: '自転車', value: '0' },
];
const TrafficAccident: FC = () => {
  return (
    <>
      <TrafficAccidentTemplate />
      <DelayedDamage />
      <CheckBox title="仮執行の有無" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故発生場所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="◯◯県◯◯市◯◯町◯◯丁目◯番先路上"
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>車両の種類</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 30, marginBottom: 10 }}>
        <Text style={styles.text}>あなた</Text>
        <RNPickerSelect
          onValueChange={(value) => {}}
          items={vehicleType}
          style={pickerSelectStyles}
        />
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 30 }}>
        <Text style={styles.text}>相手方</Text>
        <RNPickerSelect
          onValueChange={(value) => {}}
          items={vehicleType}
          style={pickerSelectStyles}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故の状況</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="交差点手前の停止線で原告運転の車が停止していたところ、後ろから来て前をよく見ていなかった被告1運転の車が原告運転の車の後部に衝突し、原告運転の車の後部バンパーやバックライト部分がこわれた"
        multiline={true}
      />
      <CheckBox title="相手方1は、相手方2の使用者である。" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="被告らは、被告2が掛けている保険で原告が運転していた車の修理代金などを支払うと約束していたのに現在まで全く支払おうとしない"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox title="交通事故証明書" />
      <CheckBox title="示談書・念書" />
      <CheckBox title="車等の損傷部分の写真" />
      <CheckBox title="領収書" />
      <CheckBox title="車等の修理代金見積書" />
      <CheckBox title="事故状況説明図" />
      <CheckBox title="登記事項証明書（商業登記簿謄本）" />
    </>
  );
};

export default TrafficAccident;
