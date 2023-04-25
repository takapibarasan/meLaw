import React, { FC, useEffect, useState } from 'react';
import { Button, CheckBox, Icon, Text } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Name from '../../molecules/Name';
import Address from '../../molecules/Address';
import Alert from '../../molecules/Alert';
import { styles, pickerSelectStylesWide } from '../../../styles/form';
import PhoneNumber from '../../molecules/PhoneNumber';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import { DisclosureSNS, blankDisclosureSNS } from '../../../models/disclosure';
import { useNavigation } from '@react-navigation/native';

type Props = {
  type: string;
  caseId: string;
};

const infringementTypes = [
  { label: '名誉感情の侵害', value: 1 },
  { label: '名誉毀損', value: 2 },
];
const Disclosure: FC<Props> = ({ type, caseId }) => {
  const navigation = useNavigation();
  const [docId, setDocId] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [alerts, setAlerts] = useState<string[]>([]);
  const ref = RNFirestore().collection('disclosure');
  const user = auth().currentUser;

  const sns: DisclosureSNS = _.cloneDeep({
    ...blankDisclosureSNS,
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

    if (sns.ipAddress === '') blankForms.push('発信者の特定に資する情報');
    if (sns.publishedInformation === '') blankForms.push('掲載された情報');
    if (sns.infringementReason === '')
      blankForms.push('権利が明らかに侵害されたとされる理由');
    if (
      sns.existsDisclosureReason === false &&
      sns.existsDisclosureReason2 === false &&
      sns.existsDisclosureReason3 === false &&
      sns.existsDisclosureReason4 === false
    )
      blankForms.push('発信者情報の開示を受けるべき正当な理由');
    if (
      sns.existsDisclosureInformation === false &&
      sns.existsDisclosureInformation2 === false &&
      sns.existsDisclosureInformation3 === false &&
      sns.existsDisclosureInformation4 === false &&
      sns.existsDisclosureInformation5 === false &&
      sns.existsDisclosureInformation6 === false &&
      sns.existsDisclosureInformation7 === false &&
      sns.existsDisclosureInformation8 === false
    )
      blankForms.push('開示を請求する発信者情報');
    if (
      sns.existsUndisclosureInformation === false &&
      sns.existsUndisclosureInformation2 === false &&
      sns.existsUndisclosureInformation3 === false
    )
      blankForms.push('発信者に示したくない私の情報');

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
      .collection('disclosure')
      .orderBy('updatedAt', 'desc')
      .where('caseId', '==', caseId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc, i) => {
          if (i === 0) setDocId(doc.id);
        });
      });
    if (docId !== '') {
      const docRef = RNFirestore().collection('disclosure').doc(docId);
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
  let setProviderPostCode: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerPostCode, setProviderPostCode] = useState<string>('');
  let setProviderPrefecture: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerPrefecture, setProviderPrefecture] = useState<string>('');
  let setProviderCity: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerCity, setProviderCity] = useState<string>('');
  let setProviderBuilding: React.Dispatch<React.SetStateAction<string>>;
  [sns.providerBuilding, setProviderBuilding] = useState<string>('');
  let setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  [sns.ipAddress, setIpAddress] = useState<string>('');
  let setPublishedInformation: React.Dispatch<React.SetStateAction<string>>;
  [sns.publishedInformation, setPublishedInformation] = useState<string>('');
  let setInfringementType: React.Dispatch<React.SetStateAction<number>>;
  [sns.infringementType, setInfringementType] = useState<number>(1);
  let setInfringementReason: React.Dispatch<React.SetStateAction<string>>;
  [sns.infringementReason, setInfringementReason] = useState<string>('');
  let setExistsDisclosureReason: React.Dispatch<React.SetStateAction<boolean>>;
  [sns.existsDisclosureReason, setExistsDisclosureReason] =
    useState<boolean>(false);
  let setExistsDisclosureReason2: React.Dispatch<React.SetStateAction<boolean>>;
  [sns.existsDisclosureReason2, setExistsDisclosureReason2] =
    useState<boolean>(false);
  let setExistsDisclosureReason3: React.Dispatch<React.SetStateAction<boolean>>;
  [sns.existsDisclosureReason3, setExistsDisclosureReason3] =
    useState<boolean>(false);
  let setExistsDisclosureReason4: React.Dispatch<React.SetStateAction<boolean>>;
  [sns.existsDisclosureReason4, setExistsDisclosureReason4] =
    useState<boolean>(false);
  let setExistsDisclosureReason5: React.Dispatch<React.SetStateAction<boolean>>;
  [sns.existsDisclosureReason5, setExistsDisclosureReason5] =
    useState<boolean>(false);
  let setExistsDisclosureInformation: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation, setExistsDisclosureInformation] =
    useState<boolean>(false);
  let setExistsDisclosureInformation2: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation2, setExistsDisclosureInformation2] =
    useState<boolean>(false);
  let setExistsDisclosureInformation3: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation3, setExistsDisclosureInformation3] =
    useState<boolean>(false);
  let setExistsDisclosureInformation4: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation4, setExistsDisclosureInformation4] =
    useState<boolean>(false);
  let setExistsDisclosureInformation5: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation5, setExistsDisclosureInformation5] =
    useState<boolean>(false);
  let setExistsDisclosureInformation6: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation6, setExistsDisclosureInformation6] =
    useState<boolean>(false);
  let setExistsDisclosureInformation7: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation7, setExistsDisclosureInformation7] =
    useState<boolean>(false);
  let setExistsDisclosureInformation8: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsDisclosureInformation8, setExistsDisclosureInformation8] =
    useState<boolean>(false);
  let setExistsUndisclosureInformation: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsUndisclosureInformation, setExistsUndisclosureInformation] =
    useState<boolean>(false);
  let setExistsUndisclosureInformation2: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsUndisclosureInformation2, setExistsUndisclosureInformation2] =
    useState<boolean>(false);
  let setExistsUndisclosureInformation3: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  [sns.existsUndisclosureInformation3, setExistsUndisclosureInformation3] =
    useState<boolean>(false);
  let setIsIdentificated: React.Dispatch<React.SetStateAction<boolean>>;
  [sns.isIdentificated, setIsIdentificated] = useState<boolean>(false);

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
      formatDigit(date.getDate().toString())
    );
  };

  const loadDocument = async () => {
    let data: FirebaseFirestoreTypes.DocumentData | null = null;
    await RNFirestore()
      .collection('disclosure')
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
            setProviderPostCode(data.providerPostCode);
            setProviderPrefecture(data.providerPrefecture);
            setProviderCity(data.providerCity);
            setProviderBuilding(data.providerBuilding);
            setIpAddress(data.ipAddress);
            setPublishedInformation(data.publishedInformation);
            setInfringementType(data.infringementType);
            setInfringementReason(data.infringementReason);
            setExistsDisclosureReason(data.existsDisclosureReason);
            setExistsDisclosureReason2(data.existsDisclosureReason2);
            setExistsDisclosureReason3(data.existsDisclosureReason3);
            setExistsDisclosureReason4(data.existsDisclosureReason4);
            setExistsDisclosureReason5(data.existsDisclosureReason5);
            setExistsDisclosureInformation(data.existsDisclosureInformation);
            setExistsDisclosureInformation2(data.existsDisclosureInformation2);
            setExistsDisclosureInformation3(data.existsDisclosureInformation3);
            setExistsDisclosureInformation4(data.existsDisclosureInformation4);
            setExistsDisclosureInformation5(data.existsDisclosureInformation5);
            setExistsDisclosureInformation6(data.existsDisclosureInformation6);
            setExistsDisclosureInformation7(data.existsDisclosureInformation7);
            setExistsDisclosureInformation8(data.existsDisclosureInformation8);
            setExistsUndisclosureInformation(
              data.existsUndisclosureInformation,
            );
            setExistsUndisclosureInformation2(
              data.existsUndisclosureInformation2,
            );
            setExistsUndisclosureInformation3(
              data.existsUndisclosureInformation3,
            );
            setIsIdentificated(data.isIdentificated);
          }
        });
      });
    if (data === null) {
      await RNFirestore()
        .collection('accessLogPreservationRequest')
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
              setName(data.name);
              setPostCode(data.postCode);
              setPrefecture(data.prefecture);
              setCity(data.city);
              setBuilding(data.building);
              setPhoneNumber(data.phoneNumber);
              setProviderName(data.providerName);
              setProviderPostCode(data.providerPostCode);
              setProviderPrefecture(data.providerPrefecture);
              setProviderCity(data.providerCity);
              setProviderBuilding(data.providerBuilding);
              setIpAddress(
                '投稿URL: ' +
                  data.url +
                  '\nIPアドレス: ' +
                  data.ipAddress +
                  '\nログイン日時: ' +
                  formatDate(data.loginDate),
              );
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
                setInfringementType(data.infringementType);
              }
            });
          });
      }
    }
  };

  useEffect(() => {
    loadDocument();
  }, []);
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>必要事項を入力しましょう</Text>
      <Text style={styles.description}>
        あなた（請求者）の情報を入力しましょう
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
        <Text style={styles.label}>
          誹謗中傷ツイートのURL、開示されたIPアドレス、
          ログイン時間帯など、発信者の特定に資する情報
        </Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textarea}
        multiline={true}
        onChangeText={(value) => setIpAddress(value)}
        value={sns.ipAddress}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>掲載された情報</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        問題の投稿内容を要約して、簡潔に記載ください。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="私が◯◯〜という情報"
        multiline={true}
        onChangeText={(value) => setPublishedInformation(value)}
        value={sns.publishedInformation}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>侵害の種類</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <RNPickerSelect
        onValueChange={(value) => setInfringementType(value)}
        items={infringementTypes}
        style={pickerSelectStylesWide}
        value={sns.infringementType}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>権利が明らかに侵害されたとされる理由</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        例: 発信者はTwitterに「○○○○〜」と投稿したが、私は○○〜である。
        よって発信者の投稿内容は完全に事実と反しており、違法性阻却事由もなく、名誉毀損に該当する。
        また、私の氏名や住所、勤務先も記載されており、プライバシー権の侵害である。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder=""
        multiline={true}
        onChangeText={(value) => setInfringementReason(value)}
        value={sns.infringementReason}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>発信者情報の開示を受けるべき正当な理由</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <CheckBox
        title="損害賠償請求権の行使のために必要であるため"
        checked={sns.existsDisclosureReason}
        onPress={() => setExistsDisclosureReason(!sns.existsDisclosureReason)}
      />
      <CheckBox
        title="謝罪広告等の名誉回復措置の要請のために必要であるため"
        checked={sns.existsDisclosureReason2}
        onPress={() => setExistsDisclosureReason2(!sns.existsDisclosureReason2)}
      />
      <CheckBox
        title="差止請求権の行使のために必要であるため"
        checked={sns.existsDisclosureReason3}
        onPress={() => setExistsDisclosureReason3(!sns.existsDisclosureReason3)}
      />
      <CheckBox
        title="発信者に対する削除要求のために必要であるため"
        checked={sns.existsDisclosureReason4}
        onPress={() => setExistsDisclosureReason4(!sns.existsDisclosureReason4)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>開示を請求する発信者情報</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        訴訟を起こす場合は、「発信者の氏名又は住所」「発信者の住所」「発信者の電話番号」「発信者の電子メールアドレス」は必須となります。
      </Text>
      <CheckBox
        title="発信者の氏名又は名称"
        checked={sns.existsDisclosureInformation}
        onPress={() =>
          setExistsDisclosureInformation(!sns.existsDisclosureInformation)
        }
      />
      <CheckBox
        title="発信者の住所"
        checked={sns.existsDisclosureInformation2}
        onPress={() =>
          setExistsDisclosureInformation2(!sns.existsDisclosureInformation2)
        }
      />
      <CheckBox
        title="発信者の電話番号"
        checked={sns.existsDisclosureInformation3}
        onPress={() =>
          setExistsDisclosureInformation3(!sns.existsDisclosureInformation3)
        }
      />
      <CheckBox
        title="発信者の電子メールアドレス"
        checked={sns.existsDisclosureInformation4}
        onPress={() =>
          setExistsDisclosureInformation4(!sns.existsDisclosureInformation4)
        }
      />
      <CheckBox
        title="侵害情報が流通した際の、当該発信者の IP アドレス及び当該 IP アドレスと組み合わされたポート番号"
        checked={sns.existsDisclosureInformation5}
        onPress={() =>
          setExistsDisclosureInformation5(!sns.existsDisclosureInformation5)
        }
      />
      <CheckBox
        title="侵害情報に係る携帯電話端末等からのインターネット接続サービス利用者識別符号"
        checked={sns.existsDisclosureInformation6}
        onPress={() =>
          setExistsDisclosureInformation6(!sns.existsDisclosureInformation6)
        }
      />
      <CheckBox
        title="侵害情報に係るＳＩＭカード識別番号のうち、携帯電話端末等からのインターネット接続サービスにより送信されたもの"
        checked={sns.existsDisclosureInformation7}
        onPress={() =>
          setExistsDisclosureInformation7(!sns.existsDisclosureInformation7)
        }
      />
      <CheckBox
        title="５ないし７から侵害情報が送信された年月日及び時刻"
        checked={sns.existsDisclosureInformation8}
        onPress={() =>
          setExistsDisclosureInformation8(!sns.existsDisclosureInformation8)
        }
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>発信者に示したくない私の情報</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <CheckBox
        title="氏名（個人の場合に限る）"
        checked={sns.existsUndisclosureInformation}
        onPress={() =>
          setExistsUndisclosureInformation(!sns.existsUndisclosureInformation)
        }
      />
      <CheckBox
        title="「権利が明らかに侵害されたとする理由」欄記載事項"
        checked={sns.existsUndisclosureInformation2}
        onPress={() =>
          setExistsUndisclosureInformation2(!sns.existsUndisclosureInformation2)
        }
      />
      <CheckBox
        title="添付した資料証拠の内、保険証のコピー"
        checked={sns.existsUndisclosureInformation3}
        onPress={() =>
          setExistsUndisclosureInformation3(!sns.existsUndisclosureInformation3)
        }
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>
          弁護士が代理人として請求する際に{'\n'}本人性を
          証明する資料の添付を省略する場合
        </Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <CheckBox
        title="私（代理人弁護士）が、請求者が間違いなく本人であること を確認しています。"
        checked={sns.isIdentificated}
        onPress={() => setIsIdentificated(!sns.isIdentificated)}
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
            navigation.navigate('発信者情報開示請求書の確認', {
              constant: type,
              variable: '発信者情報開示請求書',
              id: caseId,
            });
          }
        }}
      />
    </ScrollView>
  );
};

export default Disclosure;
