import App from 'App';
import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FAB, ListItem, Text } from 'react-native-elements';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#535353',
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    color: '#EB5757',
    fontSize: 14,
  },
});

const titles = [
  '',
  'Twitterで受けた誹謗中傷に対する慰謝料請求',
  '情報商材詐欺における返金請求',
  '未払いの給料請求',
  '売買代金請求',
  '敷金返還請求',
  '損害賠償(交通事故による物損)請求',
  '貸金返還請求',
];
const screens = [
  '',
  '慰謝料請求をしましょう',
  '返金請求をしましょう',
  '給料請求をしましょう',
  '売買代金請求をしましょう',
  '敷金返還請求をしましょう',
  '損害賠償（交通事故による物損）請求をしましょう',
  '貸金返還請求をしましょう',
];
const types = [
  '',
  '誹謗中傷',
  '返金請求',
  '給料請求',
  '売買代金請求',
  '敷金返還請求',
  '損害賠償請求',
  '貸金返還請求',
];

const DocumentScreen: FC = () => {
  const user = auth().currentUser;
  const navigation = useNavigation();
  const [docs, setDocs] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
  const loadDocuments = async () => {
    const caseDic: { [key: string]: FirebaseFirestoreTypes.DocumentData } = {};
    await RNFirestore()
      .collection('contentsCertificatedMail')
      .where('user', '==', user?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map(
          (doc) => (caseDic[doc.data().caseId] = doc.data()),
        );
      });
    await ['complaint', 'injunction', 'disclosure'].map((item) => {
      RNFirestore()
        .collection(item)
        .where('user', '==', user?.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.map((doc) => {
            if (!Object.keys(caseDic).includes(doc.data().caseId))
              caseDic[doc.data().caseId] = doc.data();
          });
          setDocs(
            Object.values(caseDic).sort((a, b) => {
              if (a.updatedAt['seconds'] > b.updatedAt['seconds']) return -1;
              if (a.updatedAt['seconds'] < b.updatedAt['seconds']) return 1;
              return 0;
            }),
          );
        });
    });
  };

  const formatDate = (timestamp: firebase.firestore.Timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const formatDigit = (num: string) => {
      if (num.length === 1) num = '0' + num;
      return num;
    };

    return (
      date.getFullYear() +
      '/' +
      formatDigit((date.getMonth() + 1).toString()) +
      '/' +
      formatDigit(date.getDate().toString()) +
      ' ' +
      formatDigit(date.getHours().toString()) +
      ':' +
      formatDigit(date.getMinutes().toString())
    );
  };

  useEffect(() => {
    loadDocuments();
    const willFocusSubscription = navigation.addListener('focus', () => {
      loadDocuments();
    });
    return willFocusSubscription;
  }, []);
  return (
    <>
      <ScrollView>
        {docs.map((doc, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              navigation.navigate(screens[doc.type], {
                type: types[doc.type],
                caseId: doc.caseId,
              });
            }}
            hasTVPreferredFocus
            tvParallaxProperties
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {titles[doc.type]}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {'最終更新日: ' + formatDate(doc.updatedAt)}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron hasTVPreferredFocus tvParallaxProperties />
          </ListItem>
        ))}
      </ScrollView>
      <FAB
        size="large"
        color="#EB5757"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon={{
          name: 'add',
          size: 25,
          color: 'white',
        }}
        onPress={() => navigation.navigate('書類作成')}
      />
    </>
  );
};

export default DocumentScreen;
