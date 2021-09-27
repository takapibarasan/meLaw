import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import { prefectures } from '../../data/forms';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStylesWide } from '../../styles/form';

type Props = {
  postCode: string;
  prefecture: string;
  city: string;
  building: string;
};
const Address: FC<Props> = ({ postCode, prefecture, city, building }) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>郵便番号</Text>
        <Text style={[styles.label, { marginLeft: 100 }]}>都道府県</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInputNarrow}
          value={postCode}
          onChangeText={(value) => {
            postCode = value;
          }}
        />
        <RNPickerSelect
          onValueChange={(value) => {
            prefecture = value;
          }}
          items={prefectures}
          style={pickerSelectStylesWide}
          value={prefecture}
        />
      </View>
      <Text style={styles.label}>市区町村・番地</Text>
      <TextInput
        style={styles.textInputWide}
        value={city}
        onChangeText={(value) => {
          city = value;
        }}
      />
      <Text style={styles.label}>建物名・部屋番号など</Text>
      <TextInput
        style={styles.textInputWide}
        value={building}
        onChangeText={(value) => {
          building = value;
        }}
      />
    </>
  );
};

export default Address;
