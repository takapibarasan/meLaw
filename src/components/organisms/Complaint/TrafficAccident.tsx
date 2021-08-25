import React, { FC, useEffect, useState } from 'react';
import { Text, Input, Button, Icon, CheckBox } from 'react-native-elements';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import TrafficAccidentTemplate from '../ContentsCertificatedMail/TrafficAccident';

const styles = StyleSheet.create({
  descriptionAttention: {
    marginTop: 40,
    color: '#EB5757',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  labelAttention: {
    marginTop: 30,
    color: '#EB5757',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#EB5757',
  },
  any: {
    marginTop: 30,
    color: '#4682b4',
    fontSize: 12,
    height: 20,
    marginLeft: 5,
    padding: 3,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#4682b4',
  },
  textInput: {
    fontSize: 16,
    width: 360,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  textInputWide: {
    fontSize: 16,
    width: 360,
    backgroundColor: 'white',
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
  text: {
    color: '#333333',
    fontSize: 16,
    marginTop: 12,
  },
  label: {
    color: '#333333',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 30,
  },
  numberInput: {
    fontSize: 16,
    width: 40,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginRight: 40,
    height: 40,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 160,
    marginLeft: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 160,
    backgroundColor: '#eee',
    marginLeft: 20,
  },
});

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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害利率</Text>
        <Text style={styles.any}>任意</Text>
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
      <CheckBox title="仮執行の有無" />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故発生場所</Text>
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="◯◯県◯◯市◯◯町◯◯丁目◯番先路上"
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>車両の種類</Text>
        <Text style={styles.labelAttention}>必須</Text>
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
        <Text style={styles.labelAttention}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="交差点手前の停止線で原告運転の車が停止していたところ、後ろから来て前をよく見ていなかった被告1運転の車が原告運転の車の後部に衝突し、原告運転の車の後部バンパーやバックライト部分がこわれた"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>参考情報</Text>
        <Text style={styles.any}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="被告らは、被告2が掛けている保険で原告が運転していた車の修理代金などを支払うと約束していたのに現在まで全く支払おうとしない"
        multiline={true}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.any}>任意</Text>
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
