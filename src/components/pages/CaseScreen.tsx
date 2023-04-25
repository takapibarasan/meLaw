import React, { FC, useEffect, useState } from 'react';
import ButtonList from '../organisms/ButtonList';
import { caseData } from '../../data/menus';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNIap, { validateReceiptIos } from 'react-native-iap';
import firebase from 'firebase/app';
import 'firebase/firestore';

const CaseScreen: FC = () => {
  const navigation = useNavigation();
  const user = auth().currentUser;
  const [isSubscription, setIsSubscription] = useState<boolean>(false);

  // const loadReceipt = async () => {
  //   await RNFirestore()
  //     .collection('receipts')
  //     .where('user', '==', user?.uid)
  //     .orderBy('updatedAt')
  //     .get()
  //     .then(async (querySnapshot) => {
  //       await querySnapshot.docs.map(async (doc) => {
  //         const data = doc.data();
  //         if (data.validated.status === 0) {
  //           // 2022-01-27 04:13:54 Etc/GMT => 2022-01-27T04:13:54
  //           const expiresDateStr = data.validated.latest_receipt_info
  //             .slice(-1)[0]
  //             .expires_date.replace(' Etc/GMT', '')
  //             .replace(' ', 'T');
  //           const expiresDate = new Date(expiresDateStr);
  //           const today = new Date();

  //           // サブスクリプションの有効期限を確認
  //           if (expiresDate < today) {
  //             const validated = await validateReceiptIos(
  //               {
  //                 'receipt-data': data.validated.latest_receipt,
  //                 password: '78a14ffb7693460bb7cf8b76755589ea',
  //               },
  //               __DEV__,
  //             );
  //             if (validated !== false && validated.status === 0) {
  //               setIsSubscription(true);
  //               RNFirestore().collection('receipts').add({
  //                 receipt: data.validated.latest_receipt,
  //                 user: user,
  //                 validated: validated,
  //                 updatedAt: firebase.firestore.Timestamp.now(),
  //               });
  //             }
  //           } else {
  //             setIsSubscription(true);
  //           }
  //         } else if (data.validated.status === 21007) {
  //           setIsSubscription(true);
  //         }
  //       });
  //     });
  // };

  // useEffect(() => {
  //   loadReceipt();
  //   const willFocusSubscription = navigation.addListener('focus', () => {
  //     loadReceipt();
  //   });
  //   return willFocusSubscription;
  // }, []);
  return (
    <ButtonList
      buttons={caseData}
      constant={''}
      isSubscription={isSubscription}
    />
  );
};

export default CaseScreen;
