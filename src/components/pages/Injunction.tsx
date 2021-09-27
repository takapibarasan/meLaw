import React, { FC, useState } from 'react';
import { Button, Icon, Text } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Name from '../molecules/Name';
import Address from '../molecules/Address';
import DateTemplate from '../molecules/Date';
import Time from '../molecules/Time';
import { styles, pickerSelectStylesWide } from '../../styles/form';
import PhoneNumber from '../../components/molecules/PhoneNumber';
import RNPickerSelect from 'react-native-picker-select';

type Props = {
  type: string;
};

const violenceType = [
  { label: '名誉感情の侵害', value: '訴状送達の日の翌日' },
  { label: '名誉毀損', value: 'その他' },
];
const ContentsCertificatedMail: FC<Props> = ({ type }) => {
  const [doc, setDoc] = useState<string>('');
  const [damageCount, setDamageCount] = useState([null]);
  const ref = firestore().collection('todos');

  const addDoc = async () => {
    await ref.add({
      title: doc,
      complete: false,
    });
    setDoc('');
  };

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>
        あなた（通告人）の情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>氏名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Name />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber />
      <Text style={styles.description}>
        誹謗中傷に関する情報を入力しましょう
      </Text>
      {damageCount.map(() => (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>誹謗中傷の投稿URL</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <TextInput style={styles.textInputWide} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>投稿時間</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <DateTemplate />
          <Time />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>侵害の種類</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <RNPickerSelect
            onValueChange={(value) => {}}
            items={violenceType}
            style={pickerSelectStylesWide}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>投稿内容</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <TextInput style={styles.textInputWide} />
        </>
      ))}
      <TouchableOpacity
        style={styles.add}
        onPress={() => {
          setDamageCount([...damageCount, null]);
        }}
      >
        <Icon reverse size={12} color="#EB5757" name="add" />
        <Text style={styles.addLabel}>誹謗中傷を追加</Text>
      </TouchableOpacity>
      <Button
        title="保存"
        type="solid"
        buttonStyle={styles.button}
        raised
        onPress={() => addDoc()}
      />
    </ScrollView>
  );
};

export default ContentsCertificatedMail;
