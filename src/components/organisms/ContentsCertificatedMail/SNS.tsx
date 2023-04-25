import React, { FC, useEffect, useState } from 'react';
import { CheckBox, Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  oppositeAccountName: string;
  slanderStartYear: string;
  slanderStartMonth: string;
  slanderEndYear: string;
  slanderEndMonth: string;
  postedDate: firebase.firestore.Timestamp | null;
  post: string;
  postedDate2: firebase.firestore.Timestamp | null;
  post2: string;
  isPointedFact: boolean;
  damageAmount: string;
  setOppositeAccountName: React.Dispatch<React.SetStateAction<string>>;
  setSlanderStartYear: React.Dispatch<React.SetStateAction<string>>;
  setSlanderStartMonth: React.Dispatch<React.SetStateAction<string>>;
  setSlanderEndYear: React.Dispatch<React.SetStateAction<string>>;
  setSlanderEndMonth: React.Dispatch<React.SetStateAction<string>>;
  setPostedDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setPost: React.Dispatch<React.SetStateAction<string>>;
  setPostedDate2: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setPost2: React.Dispatch<React.SetStateAction<string>>;
  setIsPointedFact: React.Dispatch<React.SetStateAction<boolean>>;
  setDamageAmount: React.Dispatch<React.SetStateAction<string>>;
};
const SNS: FC<Props> = ({
  oppositeAccountName,
  slanderStartYear,
  slanderStartMonth,
  slanderEndYear,
  slanderEndMonth,
  postedDate,
  post,
  postedDate2,
  post2,
  isPointedFact,
  damageAmount,
  setOppositeAccountName,
  setSlanderStartYear,
  setSlanderStartMonth,
  setSlanderEndYear,
  setSlanderEndMonth,
  setPostedDate,
  setPost,
  setPostedDate2,
  setPost2,
  setIsPointedFact,
  setDamageAmount,
}) => {
  return (
    <>
      <Text style={styles.description}>
        誹謗中傷に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>誹謗中傷を受けた期間</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
        <TextInput
          style={styles.numberInput}
          onChangeText={(value) => setSlanderStartYear(value)}
          value={slanderStartYear}
        />
        <Text style={[styles.inputLabel, { marginLeft: 0 }]}>年</Text>
        <TextInput
          style={styles.numberInputNarrow}
          onChangeText={(value) => setSlanderStartMonth(value)}
          value={slanderStartMonth}
        />
        <Text style={[styles.inputLabel, { marginLeft: 0 }]}>月</Text>
        <Text style={[styles.inputLabel, { marginLeft: 20 }]}>から</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
        <TextInput
          style={styles.numberInput}
          onChangeText={(value) => setSlanderEndYear(value)}
          value={slanderEndYear}
        />
        <Text style={[styles.inputLabel, { marginLeft: 0 }]}>年</Text>
        <TextInput
          style={styles.numberInputNarrow}
          onChangeText={(value) => setSlanderEndMonth(value)}
          value={slanderEndMonth}
        />
        <Text style={[styles.inputLabel, { marginLeft: 0 }]}>月</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>相手方のTwitterのアカウント名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setOppositeAccountName(value)}
        value={oppositeAccountName}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>誹謗中傷1</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        誹謗中傷の中で、代表的な投稿の1つ目を記載ください
      </Text>
      <Text style={[styles.text, { marginLeft: 20, marginBottom: 10 }]}>
        誹謗中傷に該当する投稿の投稿日時
      </Text>
      <DateTemplate date={postedDate} setDate={setPostedDate} />
      <Text style={styles.label}>投稿内容</Text>
      <TextInput
        style={styles.textarea}
        multiline={true}
        onChangeText={(value) => setPost(value)}
        value={post}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>誹謗中傷2</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        誹謗中傷の中で、代表的な投稿の2つ目を記載ください
      </Text>
      <Text style={[styles.text, { marginLeft: 20, marginBottom: 10 }]}>
        誹謗中傷に該当する投稿の投稿日時
      </Text>
      <DateTemplate date={postedDate2} setDate={setPostedDate2} />
      <Text style={styles.label}>投稿内容</Text>
      <TextInput
        style={styles.textarea}
        multiline={true}
        onChangeText={(value) => setPost2(value)}
        value={post2}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>損害賠償請求額</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        名誉毀損の場合は10万円〜100万円、侮辱行為の場合は10万円程度が相場になるようです。
        なお少額訴訟の場合は60万円が請求の上限金額となります。
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setDamageAmount(value)}
          value={damageAmount}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <CheckBox
        containerStyle={{ marginTop: 40 }}
        checked={isPointedFact}
        title="事実の摘示の有無"
        onPress={() => setIsPointedFact(!isPointedFact)}
      />
      <Text style={styles.inputDescription}>
        単なる侮辱ではなく、「詐欺をしている」など、投稿に虚偽の事実があれば、チェックください。
      </Text>
    </>
  );
};

export default SNS;
