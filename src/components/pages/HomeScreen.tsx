import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, ListItem, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import 'firebase/firestore';

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
  },
  buttonTitle: {
    color: '#EB5757',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 8,
  },
  button: {
    margin: 20,
  },
  title: {
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  documentTitle: {
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

const HomeScreen: FC = () => {
  const navigation = useNavigation();
  const user = auth().currentUser;

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
    await RNFirestore()
      .collection('complaint')
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
  };

  const formatDate = (timestamp: firebase.firestore.Timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const formatDigit = (num: string) => {
      if (num.length === 1) num = '0' + num;
      return num;
    };

    return (
      date.getFullYear() +
      '年' +
      formatDigit((date.getMonth() + 1).toString()) +
      '月' +
      formatDigit(date.getDate().toString()) +
      '日' +
      ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'][date.getDay()]
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
    <ScrollView>
      <View style={styles.buttonWrapper}>
        <Button
          type="clear"
          icon={<Ionicons name="ios-document" color="#EB5757" size={24} />}
          title="新規書類作成"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('書類作成')}
        ></Button>
        <Button
          type="clear"
          icon={<Ionicons name="ios-folder" color="#EB5757" size={24} />}
          title="証拠の保存"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('証拠の保存')}
        ></Button>
      </View>
      <Text style={styles.title}>作成中の書類</Text>
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
        >
          <ListItem.Content>
            <ListItem.Title style={styles.documentTitle}>
              {titles[doc.type]}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {'最終更新日: ' + formatDate(doc.updatedAt)}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron tvParallaxProperties />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
