import React, { FC, useState } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Name from '../molecules/Name';
import Address from '../molecules/Address';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../styles/form';

type Props = {
  name: string;
  postCode: string;
  prefecture: string;
  city: string;
  building: string;
  company: string;
  position: string;
  businessType: number;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPostCode: React.Dispatch<React.SetStateAction<string>>;
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setBuilding: React.Dispatch<React.SetStateAction<string>>;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  setBusinessType: React.Dispatch<React.SetStateAction<number>>;
  required: boolean;
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
  setName,
  setPostCode,
  setPrefecture,
  setCity,
  setBuilding,
  setCompany,
  setPosition,
  setBusinessType,
  required,
}) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事業種別</Text>
        {required ? (
          <Text style={styles.required}>必須</Text>
        ) : (
          <Text style={styles.optional}>任意</Text>
        )}
      </View>
      <RNPickerSelect
        onValueChange={(value) => setBusinessType(value)}
        items={businessTypes}
        style={pickerSelectStyles}
        value={businessType}
      />
      {businessType === 2 ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>会社名</Text>
            {required ? (
              <Text style={styles.required}>必須</Text>
            ) : (
              <Text style={styles.optional}>任意</Text>
            )}
          </View>
          <TextInput
            style={styles.textInputWide}
            onChangeText={(value) => setCompany(value)}
            value={company}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>代表者名</Text>
            {required ? (
              <Text style={styles.required}>必須</Text>
            ) : (
              <Text style={styles.optional}>任意</Text>
            )}
          </View>
          <Name name={name} setName={setName} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>役職名</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
          <TextInput
            style={styles.textInputWide}
            onChangeText={(value) => setPosition(value)}
            value={position}
          />
        </>
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>氏名</Text>
            {required ? (
              <Text style={styles.required}>必須</Text>
            ) : (
              <Text style={styles.optional}>任意</Text>
            )}
          </View>
          <Name name={name} setName={setName} />
        </>
      )}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        {required ? (
          <Text style={styles.required}>必須</Text>
        ) : (
          <Text style={styles.optional}>任意</Text>
        )}
      </View>
      <Address
        postCode={postCode}
        prefecture={prefecture}
        city={city}
        building={building}
        setPostCode={setPostCode}
        setPrefecture={setPrefecture}
        setCity={setCity}
        setBuilding={setBuilding}
      />
    </>
  );
};

export default PersonInfoInputForm;
