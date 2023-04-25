import React, { FC, useState } from 'react';
import { Button, Text } from 'react-native-elements';
import { TextInput, View } from 'react-native';
import { prefectures } from '../../data/forms';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from '../../styles/form';
import axios from 'axios';

type Props = {
  postCode: string;
  prefecture: string;
  city: string;
  building: string;
  setPostCode: React.Dispatch<React.SetStateAction<string>>;
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setBuilding: React.Dispatch<React.SetStateAction<string>>;
};

const Address: FC<Props> = ({
  postCode,
  prefecture,
  city,
  building,
  setPostCode,
  setPrefecture,
  setCity,
  setBuilding,
}) => {
  const getAddress = () => {
    axios
      .get('https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + postCode)
      .then((res) => {
        const data: [{ address1: string; address2: string; address3: string }] =
          res.data['results'];
        data.map((item) => {
          setPrefecture(item['address1']);
          setCity(item['address2'] + item['address3']);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log('*** 終了 ***');
      });
  };
  return (
    <>
      <Text style={styles.label}>郵便番号</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInputNarrow}
          maxLength={8}
          onChangeText={(value) => {
            let postCodeEdited = value;
            if (postCode.length == 2 && postCodeEdited.length === 3)
              postCodeEdited += '-';
            setPostCode(postCodeEdited);
          }}
          value={postCode}
        />
        <Button
          containerStyle={{ marginTop: 3 }}
          buttonStyle={{ backgroundColor: '#EB5757' }}
          titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
          onPress={() => getAddress()}
          title="住所自動入力"
        />
      </View>
      <Text style={styles.label}>都道府県</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          if (value) setPrefecture(value);
        }}
        items={prefectures}
        style={pickerSelectStyles}
        value={prefecture}
      />
      <Text style={styles.label}>市区町村・番地</Text>
      <TextInput
        style={styles.textInputWide}
        onChangeText={(value) => setCity(value)}
        value={city}
      />
      <Text style={styles.label}>建物名・部屋番号など</Text>
      <TextInput
        style={styles.textInputWide}
        onChangeText={(value) => setBuilding(value)}
        value={building}
      />
    </>
  );
};

export default Address;
