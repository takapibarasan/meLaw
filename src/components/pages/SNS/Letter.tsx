import React, { FC, useEffect, useState } from 'react';
import { Button, Icon, Text } from 'react-native-elements';
import { ScrollView, TextInput, View } from 'react-native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Name from '../../molecules/Name';
import Alert from '../../molecules/Alert';
import DateTemplate from '../../molecules/Date';
import { styles } from '../../../styles/form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import { LetterSNS, blankLetterSNS } from '../../../models/letter';
import TimeDuration from '../../molecules/TimeDuration';
import { useNavigation } from '@react-navigation/native';

type Props = {
  type: string;
  caseId: string;
};

const Letter: FC<Props> = ({ type, caseId }) => {
  const navigation = useNavigation();
  const [docId, setDocId] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  const ref = RNFirestore().collection('letter');
  const user = auth().currentUser;

  const sns: LetterSNS = _.cloneDeep({
    ...blankLetterSNS,
    caseId: caseId,
    user: user?.uid,
    createdAt: firebase.firestore.Timestamp.now(),
  });

  const validateForm = () => {
    const blankForms: string[] = [];
    if (sns.name === '') blankForms.push('氏名');
    if (sns.lawOffice === '') blankForms.push('代理人の所属法律事務所名');
    if (sns.lawyerName === '') blankForms.push('代理人の氏名');
    if (
      sns.possibleDate === null ||
      sns.possibleDateHour === '' ||
      sns.possibleDateMinute === '' ||
      sns.possibleDateHour2 === '' ||
      sns.possibleDateMinute2 === ''
    )
      blankForms.push('候補日1');

    setAlerts(blankForms);
    if (blankForms.length === 0) return true;
    return false;
  };

  const addDoc = async () => {
    const data = {
      ...sns,
      updatedAt: firebase.firestore.Timestamp.now(),
      type: 1,
    };
    await RNFirestore()
      .collection('letter')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) setDocId(doc.id);
        });
      });

    if (docId !== '') {
      const docRef = RNFirestore().collection('letter').doc(docId);
      await docRef.update(data);
    } else {
      await ref.add(data);
    }
  };

  let setName: React.Dispatch<React.SetStateAction<string>>;
  [sns.name, setName] = useState<string>('');
  let setLawyerName: React.Dispatch<React.SetStateAction<string>>;
  [sns.lawyerName, setLawyerName] = useState<string>('');
  let setLawOffice: React.Dispatch<React.SetStateAction<string>>;
  [sns.lawOffice, setLawOffice] = useState<string>('');
  let setPossibleDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [sns.possibleDate, setPossibleDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setPossibleDateHour: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDateHour, setPossibleDateHour] = useState<string>('');
  let setPossibleDateMinute: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDateMinute, setPossibleDateMinute] = useState<string>('');
  let setPossibleDateHour2: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDateHour2, setPossibleDateHour2] = useState<string>('');
  let setPossibleDateMinute2: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDateMinute2, setPossibleDateMinute2] = useState<string>('');
  let setPossibleDate2: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [sns.possibleDate2, setPossibleDate2] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setPossibleDate2Hour: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate2Hour, setPossibleDate2Hour] = useState<string>('');
  let setPossibleDate2Minute: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate2Minute, setPossibleDate2Minute] = useState<string>('');
  let setPossibleDate2Hour2: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate2Hour2, setPossibleDate2Hour2] = useState<string>('');
  let setPossibleDate2Minute2: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate2Minute2, setPossibleDate2Minute2] = useState<string>('');
  let setPossibleDate3: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [sns.possibleDate3, setPossibleDate3] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setPossibleDate3Hour: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate3Hour, setPossibleDate3Hour] = useState<string>('');
  let setPossibleDate3Minute: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate3Minute, setPossibleDate3Minute] = useState<string>('');
  let setPossibleDate3Hour2: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate3Hour2, setPossibleDate3Hour2] = useState<string>('');
  let setPossibleDate3Minute2: React.Dispatch<React.SetStateAction<string>>;
  [sns.possibleDate3Minute2, setPossibleDate3Minute2] = useState<string>('');

  const loadDocument = async () => {
    let data: FirebaseFirestoreTypes.DocumentData | null = null;
    await RNFirestore()
      .collection('letter')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) {
            setDocId(doc.id);
            data = doc.data();
            setName(data.name);
            setLawyerName(data.lawyerName);
            setLawOffice(data.lawOffice);
            setPossibleDate(data.possibleDate);
            setPossibleDateHour(data.possibleDateHour);
            setPossibleDateMinute(data.possibleDateMinute);
            setPossibleDateHour2(data.possibleDateHour2);
            setPossibleDateMinute2(data.possibleDateMinute2);
            setPossibleDate2(data.possibleDate2);
            setPossibleDate2Hour(data.possibleDate2Hour);
            setPossibleDate2Minute(data.possibleDate2Minute);
            setPossibleDate2Hour2(data.possibleDate2Hour2);
            setPossibleDate2Minute2(data.possibleDate2Minute2);
            setPossibleDate3(data.possibleDate3);
            setPossibleDate3Hour(data.possibleDate3Hour);
            setPossibleDate3Minute(data.possibleDate3Minute);
            setPossibleDate3Hour2(data.possibleDate3Hour2);
            setPossibleDate3Minute2(data.possibleDate3Minute2);
          }
        });
      });
    if (data === null) {
      await RNFirestore()
        .collection('injunction')
        .orderBy('updatedAt', 'desc')
        .where('caseId', '==', caseId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc, i) => {
            if (i === 0) {
              data = doc.data();
              setName(data.name);
            }
          });
        });
    }
  };

  useEffect(() => {
    loadDocument();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>
        あなた（債権者）の情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>氏名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Name name={sns.name} setName={setName} />
      <Text style={styles.description}>
        代理人（弁護士）の情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>代理人（弁護士）の所属法律事務所名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setLawOffice(value)}
        value={sns.lawOffice}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>代理人（弁護士）の氏名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Name name={sns.lawyerName} setName={setLawyerName} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>候補日1</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        Twitter社の代理人と調整した、審尋期日の候補日
      </Text>
      <DateTemplate date={sns.possibleDate} setDate={setPossibleDate} />
      <TimeDuration
        hour={sns.possibleDateHour}
        minute={sns.possibleDateMinute}
        hour2={sns.possibleDateHour2}
        minute2={sns.possibleDateMinute2}
        setHour={setPossibleDateHour}
        setMinute={setPossibleDateMinute}
        setHour2={setPossibleDateHour2}
        setMinute2={setPossibleDateMinute2}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>候補日2</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <DateTemplate date={sns.possibleDate2} setDate={setPossibleDate2} />
      <TimeDuration
        hour={sns.possibleDate2Hour}
        minute={sns.possibleDate2Minute}
        hour2={sns.possibleDate2Hour2}
        minute2={sns.possibleDate2Minute2}
        setHour={setPossibleDate2Hour}
        setMinute={setPossibleDate2Minute}
        setHour2={setPossibleDate2Hour2}
        setMinute2={setPossibleDate2Minute2}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>候補日3</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <DateTemplate date={sns.possibleDate3} setDate={setPossibleDate3} />
      <TimeDuration
        hour={sns.possibleDate3Hour}
        minute={sns.possibleDate3Minute}
        hour2={sns.possibleDate3Hour2}
        minute2={sns.possibleDate3Minute2}
        setHour={setPossibleDate3Hour}
        setMinute={setPossibleDate3Minute}
        setHour2={setPossibleDate3Hour2}
        setMinute2={setPossibleDate3Minute2}
      />
      {!isHidden ? <Alert alerts={alerts} /> : null}
      <Button
        title="保存"
        type="solid"
        buttonStyle={styles.button}
        raised
        onPress={async () => {
          const result = validateForm();
          setIsHidden(result);
          if (result) {
            await addDoc();
            navigation.navigate('上申書の確認', {
              constant: type,
              variable: '上申書',
              id: caseId,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default Letter;
