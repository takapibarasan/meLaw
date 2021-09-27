import React, { FC } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Name from '../molecules/Name';
import Address from '../molecules/Address';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStylesWide } from '../../styles/form';

type Props = {
  name: string;
  postCode: string;
  prefecture: string;
  city: string;
  building: string;
  company: string;
  position: string;
  businessType: number;
};

const businessTypes = [
  { label: '個人', value: 1 },
  { label: '法人', value: 2 },
];
const PersonInfoInputForm: FC<Props> = ({
  name,
  postCode,
  prefecture,
  city,
  building,
  company,
  position,
  businessType,
}) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事業種別</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => (businessType = value)}
        items={businessTypes}
        style={pickerSelectStylesWide}
      />
      {businessType === 2 ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>会社名</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <TextInput
            style={styles.textInputWide}
            value={company}
            onChangeText={(value) => (company = value)}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>代表者名</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <Name name={name} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>役職名</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <TextInput
            style={styles.textInputWide}
            value={position}
            onChangeText={(value) => (position = value)}
          />
        </>
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>氏名</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <Name name={name} />
        </>
      )}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address
        postCode={postCode}
        prefecture={prefecture}
        city={city}
        building={building}
      />
    </>
  );
};

export default PersonInfoInputForm;
