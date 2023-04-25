import React, { FC, useEffect, useState } from 'react';
import { Button, Text } from 'react-native-elements';
import { ScrollView, View } from 'react-native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Name from '../../molecules/Name';
import Alert from '../../molecules/Alert';
import { styles } from '../../../styles/form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import {
  UnsecuredRequestLetterSNS,
  blankUnsecuredRequestLetterSNS,
} from '../../../models/unsecured-request-letter';
import { useNavigation } from '@react-navigation/native';

type Props = {
  type: string;
  caseId: string;
};

const Injunction: FC<Props> = ({ type, caseId }) => {
  const navigation = useNavigation();
  const [docId, setDocId] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  const ref = RNFirestore().collection('unsecuredRequestLetter');
  const user = auth().currentUser;

  const sns: UnsecuredRequestLetterSNS = _.cloneDeep({
    ...blankUnsecuredRequestLetterSNS,
    caseId: caseId,
    user: user?.uid,
    createdAt: firebase.firestore.Timestamp.now(),
  });

  const validateForm = () => {
    const blankForms: string[] = [];
    if (sns.name === '') blankForms.push('氏名');

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
      .collection('unsecuredRequestLetter')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) setDocId(doc.id);
        });
      });
    if (docId !== '') {
      const docRef = RNFirestore()
        .collection('unsecuredRequestLetter')
        .doc(docId);
      await docRef.update(data);
    } else {
      await ref.add(data);
    }
  };

  let setName: React.Dispatch<React.SetStateAction<string>>;
  [sns.name, setName] = useState<string>('');

  const loadDocument = async () => {
    let data: FirebaseFirestoreTypes.DocumentData | null = null;
    await RNFirestore()
      .collection('unsecuredRequestLetter')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) {
            setDocId(doc.id);
            data = doc.data();
            setName(data.name);
          }
        });
      });
    if (data === null) {
      await RNFirestore()
        .collection('letter')
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

    if (data === null) {
      await RNFirestore()
        .collection('letter')
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
            navigation.navigate('無担保上申書の確認', {
              constant: type,
              variable: '無担保上申書',
              id: caseId,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default Injunction;
