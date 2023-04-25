import React, { FC, useEffect, useState } from 'react';
import { Button, Icon, Text } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Name from '../../molecules/Name';
import Address from '../../molecules/Address';
import Alert from '../../molecules/Alert';
import DateTemplate from '../../molecules/Date';
import Time from '../../molecules/Time';
import { styles } from '../../../styles/form';
import PhoneNumber from '../../molecules/PhoneNumber';
import _ from 'lodash';
import {
  AccessLogPreventationRequestSNS,
  blankAccessLogPreventationRequestSNS,
} from '../../../models/access-log-preventation-request';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  type: string;
  caseId: string;
};

const AccessLogPreservationRequest: FC<Props> = ({ type, caseId }) => {
  const navigation = useNavigation();
  const [docId, setDocId] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  const ref = RNFirestore().collection('accessLogPreservationRequest');
  const user = auth().currentUser;

  const sns: AccessLogPreventationRequestSNS = _.cloneDeep({
    ...blankAccessLogPreventationRequestSNS,
    caseId: caseId,
    user: user?.uid,
    createdAt: firebase.firestore.Timestamp.now(),
  });

  const validateForm = () => {
    const blankForms: string[] = [];
    if (sns.name === '') blankForms.push('氏名');
    if (sns.postCode === '') blankForms.push('郵便番号');
    if (sns.prefecture === '') blankForms.push('都道府県');
    if (sns.city === '') blankForms.push('市区町村・番地');
    if (sns.providerName === '') blankForms.push('プロバイダ名');
    if (sns.providerPostCode === '') blankForms.push('プロバイダの郵便番号');
    if (sns.providerPrefecture === '') blankForms.push('プロバイダの都道府県');
    if (sns.providerCity === '') blankForms.push('プロバイダの市区町村・番地');
    if (sns.url === '') blankForms.push('誹謗中傷に該当する投稿のURL');
    if (sns.accountId === '')
      blankForms.push('誹謗中傷に該当する投稿をしたアカウントのID');
    if (
      sns.postedDate === null ||
      sns.postedHour === '' ||
      sns.postedMinute === ''
    )
      blankForms.push('誹謗中傷に該当する投稿の投稿日時');
    if (sns.loginDate === null)
      blankForms.push('問題のツイートに近接したログイン日時');
    if (sns.ipAddress === '') blankForms.push('IPアドレス');

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
      .collection('accessLogPreservationRequest')
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
        .collection('accessLogPreservationRequest')
        .doc(docId);
      await docRef.update(data);
    } else {
      await ref.add(data);
    }
  };

  let setName: React.Dispatch<React.SetStateAction<string>>;
  [sns.name, setName] = useState<string>('');
  let setPostCode: React.Dispatch<React.SetStateAction<string>>;
  [sns.postCode, setPostCode] = useState<string>('');
  let setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  [sns.prefecture, setPrefecture] = useState<string>('');
  let setCity: React.Dispatch<React.SetStateAction<string>>;
  [sns.city, setCity] = useState<string>('');
  let setBuilding: React.Dispatch<React.SetStateAction<string>>;
  [sns.building, setBuilding] = useState<string>('');
  let setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  [sns.phoneNumber, setPhoneNumber] = useState<string>('');
  let setProviderName: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerName, setProviderName] = useState<string>('');
  let setProviderDepartment: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerDepartment, setProviderDepartment] = useState<string>('');
  let setProviderPostCode: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerPostCode, setProviderPostCode] = useState<string>('');
  let setProviderPrefecture: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerPrefecture, setProviderPrefecture] = useState<string>('');
  let setProviderCity: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerCity, setProviderCity] = useState<string>('');
  let setProviderBuilding: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerBuilding, setProviderBuilding] = useState<string>('');
  let setUrl: React.Dispatch<React.SetStateAction<string>>;
  [sns.url, setUrl] = useState<string>('');
  let setAccountId: React.Dispatch<React.SetStateAction<string>>;
  [sns.accountId, setAccountId] = useState<string>('');
  let setPostedDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [sns.postedDate, setPostedDate] =
    useState<firebase.firestore.Timestamp | null>(null);
  let setPostedHour: React.Dispatch<React.SetStateAction<string>>;
  [sns.postedHour, setPostedHour] = useState<string>('');
  let setPostedMinute: React.Dispatch<React.SetStateAction<string>>;
  [sns.postedMinute, setPostedMinute] = useState<string>('');
  let setLoginDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  [sns.loginDate, setLoginDate] = useState<firebase.firestore.Timestamp | null>(
    null,
  );
  let setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  [sns.ipAddress, setIpAddress] = useState<string>('');

  const loadDocument = async () => {
    let data: FirebaseFirestoreTypes.DocumentData | null = null;
    await RNFirestore()
      .collection('accessLogPreservationRequest')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) {
            setDocId(doc.id);
            data = doc.data();
            setName(data.name);
            setPostCode(data.postCode);
            setPrefecture(data.prefecture);
            setCity(data.city);
            setBuilding(data.building);
            setPhoneNumber(data.phoneNumber);
            setProviderName(data.providerName);
            setProviderDepartment(data.providerDepartment);
            setProviderPostCode(data.providerPostCode);
            setProviderPrefecture(data.providerPrefecture);
            setProviderCity(data.providerCity);
            setProviderBuilding(data.providerBuilding);
            setUrl(data.url);
            setAccountId(data.accountId);
            setPostedDate(data.postedDate);
            setPostedHour(data.postedHour);
            setPostedMinute(data.postedMinute);
            setLoginDate(data.loginDate);
            setIpAddress(data.ipAddress);
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
              setPostCode(data.postCode);
              setPrefecture(data.prefecture);
              setCity(data.city);
              setBuilding(data.building);
              setPhoneNumber(data.phoneNumber);
              setUrl(data.url);
              setAccountId(data.accountId);
              setPostedDate(data.postedDate);
              setPostedHour(data.postedHour);
              setPostedMinute(data.postedMinute);
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address
        postCode={sns.postCode}
        prefecture={sns.prefecture}
        city={sns.city}
        building={sns.building}
        setPostCode={setPostCode}
        setPrefecture={setPrefecture}
        setCity={setCity}
        setBuilding={setBuilding}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>電話番号</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <PhoneNumber
        phoneNumber={sns.phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <Text style={styles.description}>プロバイダの情報を入力しましょう</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>プロバイダ名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Name name={sns.providerName} setName={setProviderName} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>部署名</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Name name={sns.providerDepartment} setName={setProviderDepartment} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>住所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Address
        postCode={sns.providerPostCode}
        prefecture={sns.providerPrefecture}
        city={sns.providerCity}
        building={sns.providerBuilding}
        setPostCode={setProviderPostCode}
        setPrefecture={setProviderPrefecture}
        setCity={setProviderCity}
        setBuilding={setProviderBuilding}
      />
      <Text style={styles.description}>
        誹謗中傷に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>誹謗中傷に該当する投稿のURL</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        onChangeText={(value) => setUrl(value)}
        value={sns.url}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>誹謗中傷したアカウントのID</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setAccountId(value)}
        value={sns.accountId}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>誹謗中傷に該当する投稿の投稿日時</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={sns.postedDate} setDate={setPostedDate} />
      <Time
        hour={sns.postedHour}
        minute={sns.postedMinute}
        setHour={setPostedHour}
        setMinute={setPostedMinute}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>
          Twitter社より開示された、問題のツイートに近接したログイン日時
        </Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={sns.loginDate} setDate={setLoginDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>Twitter社より開示されたIPアドレス</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setIpAddress(value)}
        value={sns.ipAddress}
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
            navigation.navigate('アクセスログ保存要請書の確認', {
              constant: type,
              variable: 'アクセスログ保存要請書',
              id: caseId,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default AccessLogPreservationRequest;
