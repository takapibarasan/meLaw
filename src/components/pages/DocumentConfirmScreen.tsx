import React, { FC, useEffect, useRef, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { default as RNFirestore } from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import 'firebase/firestore';
import FormConfirm from '../molecules/FormConfirm';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
import { apiKey } from '../../config/apiKey.json';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  wrapper: {
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  button: {
    fontSize: 16,
    margin: 10,
    backgroundColor: 'white',
    borderColor: '#EB5757',
    borderRadius: 20,
    borderWidth: 2,
  },
  buttonContainer: {
    width: 180,
  },
  buttonTitle: {
    color: '#EB5757',
    fontWeight: 'bold',
  },
  grayButton: {
    fontSize: 16,
    margin: 12,
    backgroundColor: 'white',
    borderColor: '#535353',
    borderRadius: 20,
    borderWidth: 2,
  },
  grayButtonTitle: {
    color: '#535353',
    fontWeight: 'bold',
  },
  confirmWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#535353',
  },
  titleWrapper: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { constant: string; variable: string; id: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

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
const docTypes = [
  '',
  '内容証明郵便',
  '訴状',
  '仮処分命令申立書',
  '上申書',
  '無担保上申書',
  'アクセスログ保存要請書',
  '発信者情報開示請求書',
];

const DocumentConfirmScreen = ({ route, navigation }: Props) => {
  const { constant, variable, id } = route.params;
  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData | null>(
    null,
  );
  const [posts, setPosts] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);

  const attachmentDocuments: string[] = [];
  const disclosureReasons: string[] = [];
  const disclosureInformation: string[] = [];
  const undisclosureInformation: string[] = [];
  if (data !== null) {
    if (data['existsEmail'])
      attachmentDocuments.push(
        '被告（相手方）から購入した際の連絡記録（E-mail）',
      );
    if (data['existsTranscriptCopy'])
      attachmentDocuments.push(
        '内容証明郵便を被告（相手方）に送付した記録（謄本の控え）',
      );
    if (data['existsScreenShot'])
      attachmentDocuments.push(
        '商品が販売されていたWebサイトのスクリーンショット',
      );
    if (data['existsContract']) attachmentDocuments.push('契約書');
    if (data['existsStatement']) attachmentDocuments.push('給与等支払明細書');
    if (data['existsCertificate'])
      attachmentDocuments.push('登記事項証明書（商業登記簿謄本）');
    if (data['existsInvoice']) attachmentDocuments.push('請求書（控）');
    if (data['existsDeliveryNote']) attachmentDocuments.push('納品書（控）');
    if (data['existsReceipt']) {
      if (constant === '返金請求')
        attachmentDocuments.push('商品購入の際の領収書');
      if (constant === '敷金返還請求') attachmentDocuments.push('敷金領収書');
      if (constant === '売買代金請求') attachmentDocuments.push('受領証');
      if (constant === '損害賠償請求') attachmentDocuments.push('領収書');
    }
    if (data['existsContentsCertifiedMail'])
      attachmentDocuments.push('内容証明郵便');
    if (data['existsDeliveryCertificate'])
      attachmentDocuments.push('配達証明書');
    if (data['existsAccidentCertificate'])
      attachmentDocuments.push('交通事故証明書');
    if (data['existsMemorandum']) attachmentDocuments.push('示談書・念書');
    if (data['existsPhoto']) attachmentDocuments.push('車等の損傷部分の写真');
    if (data['existsEstimate'])
      attachmentDocuments.push('車等の修理代金見積書');
    if (data['existsDiagram']) attachmentDocuments.push('事故状況説明図');
    if (data['existsAcknowledgement']) attachmentDocuments.push('借用書');
    if (data['existsEvidence'])
      attachmentDocuments.push(
        '誹謗中傷を受けた証拠（名誉棄損に該当する投稿内容）',
      );
    if (data['existsDisclosureDocument'])
      attachmentDocuments.push(
        'Twitter社より開示されたIPアドレスが記載された書類',
      );
    if (data['existsProviderDocument'])
      attachmentDocuments.push(
        'プロバイダより開示された被告の情報が記載された書類',
      );
    if (data['existsDisclosureReason'])
      disclosureReasons.push('損害賠償請求権の行使のために必要であるため');
    if (data['existsDisclosureReason2'])
      disclosureReasons.push(
        '謝罪広告等の名誉回復措置の要請のために必要であるため',
      );
    if (data['existsDisclosureReason3'])
      disclosureReasons.push('差止請求権の行使のために必要であるため');
    if (data['existsDisclosureReason4'])
      disclosureReasons.push('発信者に対する削除要求のために必要であるため');
    if (data['existsDisclosureInformation'])
      disclosureInformation.push('発信者の氏名又は名称');
    if (data['existsDisclosureInformation2'])
      disclosureInformation.push('発信者の住所');
    if (data['existsDisclosureInformation3'])
      disclosureInformation.push('発信者の電話番号');
    if (data['existsDisclosureInformation4'])
      disclosureInformation.push('発信者の電子メールアドレス');
    if (data['existsDisclosureInformation5'])
      disclosureInformation.push(
        '侵害情報が流通した際の、当該発信者の IP アドレス及び当該 IP アドレスと組み合わされたポート番号',
      );
    if (data['existsDisclosureInformation6'])
      disclosureInformation.push(
        '侵害情報に係る携帯電話端末等からのインターネット接続サービス利用者識別符号',
      );
    if (data['existsDisclosureInformation7'])
      disclosureInformation.push(
        '侵害情報に係るＳＩＭカード識別番号のうち、携帯電話端末等からのインターネット接続サービスにより送信されたもの',
      );
    if (data['existsDisclosureInformation8'])
      disclosureInformation.push(
        '５ないし７から侵害情報が送信された年月日及び時刻',
      );
    if (data['existsUndisclosureInformation'])
      undisclosureInformation.push('氏名（個人の場合に限る）');
    if (data['existsUndisclosureInformation2'])
      undisclosureInformation.push(
        '「権利が明らかに侵害されたとする理由」欄記載事項',
      );
    if (data['existsUndisclosureInformation3'])
      undisclosureInformation.push(
        '私（代理人弁護士）が、請求者が間違いなく本人であること を確認しています。',
      );
  }

  const createDoc = (docFormat: number) => {
    // docFormat: 1 => Office, 2 => PDF
    const args = {
      tid: types.indexOf(constant),
      docType: docTypes.indexOf(variable),
      docId: id,
      docFormat: docFormat,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    };
    console.log(args);

    const now = new Date();
    const fileId =
      now.getFullYear() +
      ('0' + (now.getMonth() + 1)).slice(-2) +
      ('0' + now.getDate()).slice(-2) +
      ('0' + now.getHours()).slice(-2) +
      ('0' + now.getMinutes()).slice(-2) +
      ('0' + now.getSeconds()).slice(-2) +
      now.getMilliseconds();
    let extension = '.docx';
    if (variable == '訴状') extension = '.xlsx';
    if (docFormat === 2) extension = '.pdf';
    const dirs =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DCIMDir;
    RNFetchBlob.config({
      fileCache: true,
      path: dirs + `/` + constant + fileId + extension,
    })
      .fetch(
        'POST',
        'https://www.latamo.net/api/create/document',
        headers,
        JSON.stringify(args),
      )
      .then((res) => {
        console.log(res);
        Toast.show('「ファイル」フォルダに書類を保存しました。');
      })
      .catch((errorMessage, statusCode) => {
        console.log(errorMessage);
      });
  };
  const loadDocument = async () => {
    let collectionName = 'contentsCertificatedMail';
    if (variable == '訴状') collectionName = 'complaint';
    if (variable == '仮処分命令申立書') collectionName = 'injunction';
    if (variable == '上申書') collectionName = 'letter';
    if (variable == '無担保上申書') collectionName = 'unsecuredRequestLetter';
    if (variable == 'アクセスログ保存要請書')
      collectionName = 'accessLogPreservationRequest';
    if (variable == '発信者情報開示請求書') collectionName = 'disclosure';

    await RNFirestore()
      .collection(collectionName)
      .where('caseId', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          setData(doc.data());
        });
      });
    if (variable == '仮処分命令申立書') {
      await RNFirestore()
        .collection('posts')
        .where('caseId', '==', id)
        .orderBy('index')
        .orderBy('updatedAt')
        .get()
        .then(async (querySnapshot) => {
          const tmp: FirebaseFirestoreTypes.DocumentData[] = [];
          await querySnapshot.docs.map((doc) => tmp.push(doc.data()));
          setPosts(tmp);
        });
    }
  };

  useEffect(() => {
    loadDocument();
  }, []);

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
  return (
    <View style={styles.container}>
      <ScrollView>
        <>
          {data !== null ? (
            <>
              {variable === '訴状' ? (
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>裁判に関する情報</Text>
                </View>
              ) : null}
              <View style={styles.confirmWrapper}>
                {data['lawsuitCount'] ? (
                  <FormConfirm
                    title="本年の少額訴訟の回数"
                    item={data['lawsuitCount'] + '回'}
                    required={true}
                  />
                ) : null}
                {data['courtName'] ? (
                  <FormConfirm
                    title="簡易裁判所の名前"
                    item={data['courtName']}
                    required={true}
                  />
                ) : null}
              </View>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>自分の情報</Text>
              </View>
              <View style={styles.confirmWrapper}>
                {data['businessType'] ? (
                  <FormConfirm
                    title={'事業種別'}
                    item={data['businessType'] == 1 ? '個人' : '法人'}
                    required={true}
                  />
                ) : null}
                {data['name'] ? (
                  <FormConfirm
                    title={'氏名'}
                    item={data['name']}
                    required={true}
                  />
                ) : null}
                {data['postCode'] ? (
                  <FormConfirm
                    title={'郵便番号'}
                    item={data['postCode']}
                    required={true}
                  />
                ) : null}
                {data['prefecture'] ? (
                  <FormConfirm
                    title={'都道府県'}
                    item={data['prefecture']}
                    required={true}
                  />
                ) : null}
                {data['city'] ? (
                  <FormConfirm
                    title={'市区町村・番地'}
                    item={data['city']}
                    required={true}
                  />
                ) : null}
                {data['building'] ? (
                  <FormConfirm
                    title={'建物名・部屋番号など'}
                    item={data['building']}
                    required={true}
                  />
                ) : null}
                {data['businessType'] === 2 && data['company'] ? (
                  <FormConfirm
                    title={'会社名'}
                    item={data['company']}
                    required={true}
                  />
                ) : null}
                {data['businessType'] === 2 && data['position'] ? (
                  <FormConfirm title={'役職'} item={data['position']} />
                ) : null}
                {data['phoneNumber'] ? (
                  <FormConfirm
                    title={'電話番号'}
                    item={data['phoneNumber']}
                    required={true}
                  />
                ) : null}
                {data['mailingType'] ? (
                  <FormConfirm
                    title="書類の送達場所"
                    item={
                      data['mailingType'] == 1
                        ? '上記住所（あなたの住所）'
                        : data['mailingType'] === 2
                        ? '勤務先'
                        : 'その他の場所'
                    }
                    required={true}
                  />
                ) : null}
                {data['mailingType'] === 3 && data['mailingDescription'] ? (
                  <FormConfirm
                    title="あなたとの関係"
                    item={data['mailingDescription']}
                    required={true}
                  />
                ) : null}
                {[2, 3].indexOf(data['mailingType']) !== -1 &&
                data['mailingPostCode'] ? (
                  <FormConfirm
                    title="書類送達場所の郵便番号"
                    item={data['mailingPostCode']}
                    required={true}
                  />
                ) : null}
                {data['mailingType'] === 2 && data['mailingCompany'] ? (
                  <FormConfirm
                    title="書類送達場所の会社名"
                    item={data['mailingCompany']}
                    required={true}
                  />
                ) : null}
                {[2, 3].indexOf(data['mailingType']) !== -1 &&
                data['mailingPrefecture'] ? (
                  <FormConfirm
                    title="書類送達場所の都道府県"
                    item={data['mailingPrefecture']}
                    required={true}
                  />
                ) : null}
                {[2, 3].indexOf(data['mailingType']) !== -1 &&
                data['mailingCity'] ? (
                  <FormConfirm
                    title="書類送達場所の市区町村・番地"
                    item={data['mailingCity']}
                    required={true}
                  />
                ) : null}
                {[2, 3].indexOf(data['mailingType']) !== -1 &&
                data['mailingBuilding'] ? (
                  <FormConfirm
                    title="書類送達場所の建物名・部屋番号など"
                    item={data['mailingBuilding']}
                    required={true}
                  />
                ) : null}
                {[2, 3].indexOf(data['mailingType']) !== -1 &&
                data['mailingPhoneNumber'] ? (
                  <FormConfirm
                    title="書類送達場所の電話番号"
                    item={data['mailingPhoneNumber']}
                    required={true}
                  />
                ) : null}
                {data['recipientType'] ? (
                  <FormConfirm
                    title="書類の受取人"
                    item={data['recipientType'] === 1 ? '自分' : 'その他'}
                    required={true}
                  />
                ) : null}
                {data['recipientType'] === 2 && data['recipientName'] ? (
                  <FormConfirm
                    title="書類の受取人名"
                    item={data['recipientName']}
                    required={true}
                  />
                ) : null}
              </View>
              {data['oppositeName'] ? (
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>相手方の情報</Text>
                </View>
              ) : null}
              <View style={styles.confirmWrapper}>
                {data['oppositeBusinessType'] ? (
                  <FormConfirm
                    title={'事業種別'}
                    item={data['oppositeBusinessType'] === 1 ? '個人' : '法人'}
                    required={true}
                  />
                ) : null}
                {data['oppositeName'] ? (
                  <FormConfirm
                    title={'氏名'}
                    item={data['oppositeName']}
                    required={true}
                  />
                ) : null}
                {data['oppositePostCode'] ? (
                  <FormConfirm
                    title={'郵便番号'}
                    item={data['oppositePostCode']}
                    required={true}
                  />
                ) : null}
                {data['oppositePrefecture'] ? (
                  <FormConfirm
                    title={'都道府県'}
                    item={data['oppositePrefecture']}
                    required={true}
                  />
                ) : null}
                {data['oppositeCity'] ? (
                  <FormConfirm
                    title={'市区町村・番地'}
                    item={data['oppositeCity']}
                    required={true}
                  />
                ) : null}
                {data['oppositeBuilding'] ? (
                  <FormConfirm
                    title={'建物名・部屋番号など'}
                    item={data['oppositeBuilding']}
                    required={true}
                  />
                ) : null}
                {data['oppositeBusinessType'] === 2 &&
                data['oppositePosition'] ? (
                  <FormConfirm title={'役職'} item={data['oppositePosition']} />
                ) : null}
                {data['oppositeBusinessType'] === 2 &&
                data['oppositeCompany'] ? (
                  <FormConfirm
                    title={'会社名'}
                    item={data['oppositeCompany']}
                    required={true}
                  />
                ) : null}
                {data['oppositePhoneNumber'] ? (
                  <FormConfirm
                    title={'電話番号'}
                    item={data['oppositePhoneNumber']}
                    required={true}
                  />
                ) : null}
              </View>
              {data['opposite2Name'] ? (
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>相手方2の情報</Text>
                </View>
              ) : null}
              <View style={styles.confirmWrapper}>
                {data['opposite2Name'] && data['opposite2BusinessType'] ? (
                  <FormConfirm
                    title={'事業種別'}
                    item={data['opposite2BusinessType'] === 1 ? '個人' : '法人'}
                  />
                ) : null}
                {data['opposite2Name'] ? (
                  <FormConfirm title={'氏名'} item={data['opposite2Name']} />
                ) : null}
                {data['opposite2PostCode'] ? (
                  <FormConfirm
                    title={'郵便番号'}
                    item={data['opposite2PostCode']}
                  />
                ) : null}
                {data['opposite2Prefecture'] ? (
                  <FormConfirm
                    title={'都道府県'}
                    item={data['opposite2Prefecture']}
                  />
                ) : null}
                {data['opposite2City'] ? (
                  <FormConfirm
                    title={'市区町村・番地'}
                    item={data['opposite2City']}
                  />
                ) : null}
                {data['opposite2Building'] ? (
                  <FormConfirm
                    title={'建物名・部屋番号など'}
                    item={data['opposite2Building']}
                  />
                ) : null}
                {data['opposite2BusinessType'] === 2 &&
                data['opposite2Company'] ? (
                  <FormConfirm
                    title={'会社名'}
                    item={data['opposite2Company']}
                  />
                ) : null}
                {data['opposite2BusinessType'] === 2 &&
                data['opposite2Position'] ? (
                  <FormConfirm
                    title={'役職'}
                    item={data['opposite2Position']}
                  />
                ) : null}
                {data['opposite2PhoneNumber'] ? (
                  <FormConfirm
                    title={'電話番号'}
                    item={data['opposite2PhoneNumber']}
                  />
                ) : null}
              </View>
              {data['providerName'] ? (
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>プロバイダーの情報</Text>
                </View>
              ) : null}
              <View style={styles.confirmWrapper}>
                {data['providerName'] ? (
                  <FormConfirm
                    title="プロバイダー名"
                    item={data['providerName']}
                    required={true}
                  />
                ) : null}
                {data['providerDepartment'] ? (
                  <FormConfirm
                    title={'部署名'}
                    item={data['providerDepartment']}
                  />
                ) : null}
                {data['providerPostCode'] ? (
                  <FormConfirm
                    title={'郵便番号'}
                    item={data['providerPostCode']}
                  />
                ) : null}
                {data['providerPrefecture'] ? (
                  <FormConfirm
                    title={'都道府県'}
                    item={data['providerPrefecture']}
                  />
                ) : null}
                {data['providerCity'] ? (
                  <FormConfirm
                    title={'市区町村・番地'}
                    item={data['providerCity']}
                  />
                ) : null}
                {data['providerBuilding'] ? (
                  <FormConfirm
                    title={'建物名・部屋番号など'}
                    item={data['providerBuilding']}
                  />
                ) : null}
              </View>
              {data['lawyerName'] ? (
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>代理人（弁護士）の情報</Text>
                </View>
              ) : null}
              <View style={styles.confirmWrapper}>
                {data['lawyerName'] ? (
                  <FormConfirm
                    title="代理人（弁護士）の氏名"
                    item={data['lawyerName']}
                    required={true}
                  />
                ) : null}
                {data['lawOffice'] ? (
                  <FormConfirm
                    title="代理人（弁護士）の所属法律事務所名"
                    item={data['lawOffice']}
                    required={true}
                  />
                ) : null}
              </View>
              {variable !== '仮処分命令申立書' ? (
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>
                    {constant === '誹謗中傷'
                      ? '誹謗中傷'
                      : constant === '返金請求'
                      ? '契約条件'
                      : constant === '給料請求'
                      ? '契約条件'
                      : constant === '売買代金請求'
                      ? '販売条件'
                      : constant === '敷金返還請求'
                      ? '賃貸条件'
                      : constant === '損害賠償請求'
                      ? '交通事故'
                      : constant === '貸金返還請求'
                      ? '貸付金'
                      : ''}
                    に関する情報
                  </Text>
                </View>
              ) : null}
              {posts.map((item, i) => {
                return (
                  <>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.title}>
                        誹謗中傷{i + 1}に関する情報
                      </Text>
                    </View>
                    <View style={styles.confirmWrapper}>
                      {item['url'] ? (
                        <FormConfirm
                          title="誹謗中傷に該当する投稿のURL"
                          item={item['url']}
                          required={true}
                        />
                      ) : null}
                      {item['accountId'] ? (
                        <FormConfirm
                          title="誹謗中傷に該当する投稿をしたアカウントのID"
                          item={item['accountId']}
                          required={true}
                        />
                      ) : null}
                      {item['postedDate'] ||
                      item['postedHour'] ||
                      item['postedMinute'] ? (
                        <FormConfirm
                          title="誹謗中傷に該当する投稿の投稿日時"
                          item={
                            formatDate(item['postedDate']) +
                            (item['postedHour'] && item['postedMinute']
                              ? '　' +
                                item['postedHour'] +
                                '時' +
                                item['postedMinute'] +
                                '分'
                              : '')
                          }
                          required={true}
                        />
                      ) : null}
                      {item['infringementType'] ? (
                        <FormConfirm
                          title="侵害の種類"
                          item={
                            item['infringementType'] === 1
                              ? '名誉感情の侵害'
                              : '名誉毀損'
                          }
                          required={true}
                        />
                      ) : null}
                      {item['identifiabilityType'] ? (
                        <FormConfirm
                          title="同定可能性がある理由"
                          item={
                            item['identifiabilityType'] === 1
                              ? '債権者の実名が記載されている'
                              : item['identifiabilityType'] === 2
                              ? '債権者を特定することができる社会的な肩書きが記載されている'
                              : '本ハンドルネームから実際に誰を指すか周囲が認識できるほどに浸透している'
                          }
                          required={true}
                        />
                      ) : null}
                      {item['post'] ? (
                        <FormConfirm
                          title="投稿内容"
                          item={item['post']}
                          required={true}
                        />
                      ) : null}
                    </View>
                  </>
                );
              })}
              <View style={styles.confirmWrapper}>
                {data['possibleDate'] &&
                data['possibleDateHour'] &&
                data['possibleDateMinute'] &&
                data['possibleDateHour2'] &&
                data['possibleDateMinute2'] ? (
                  <FormConfirm
                    title="候補日1"
                    item={
                      formatDate(data['possibleDate']) +
                      '\n' +
                      data['possibleDateHour'] +
                      '時' +
                      data['possibleDateMinute'] +
                      '分 〜 ' +
                      data['possibleDateHour2'] +
                      '時' +
                      data['possibleDateMinute2'] +
                      '分'
                    }
                    required={true}
                  />
                ) : null}
                {data['possibleDate2'] &&
                data['possibleDate2Hour'] &&
                data['possibleDate2Minute'] &&
                data['possibleDate2Hour2'] &&
                data['possibleDate2Minute2'] ? (
                  <FormConfirm
                    title="候補日2"
                    item={
                      formatDate(data['possibleDate2']) +
                      '\n' +
                      data['possibleDate2Hour'] +
                      '時' +
                      data['possibleDate2Minute'] +
                      '分 〜 ' +
                      data['possibleDate2Hour2'] +
                      '時' +
                      data['possibleDate2Minute2'] +
                      '分'
                    }
                    required={true}
                  />
                ) : null}
                {data['possibleDate3'] &&
                data['possibleDate3Hour'] &&
                data['possibleDate3Minute'] &&
                data['possibleDate3Hour2'] &&
                data['possibleDate3Minute2'] ? (
                  <FormConfirm
                    title="候補日3"
                    item={
                      formatDate(data['possibleDate3']) +
                      '\n' +
                      data['possibleDate3Hour'] +
                      '時' +
                      data['possibleDate3Minute'] +
                      '分 〜 ' +
                      data['possibleDate3Hour2'] +
                      '時' +
                      data['possibleDate3Minute2'] +
                      '分'
                    }
                    required={true}
                  />
                ) : null}
                {data['oppositeAccountName'] ? (
                  <FormConfirm
                    title="アカウント名"
                    item={data['oppositeAccountName']}
                    required={true}
                  />
                ) : null}
                {data['slanderStartYear'] &&
                data['slanderStartMonth'] &&
                data['slanderEndYear'] &&
                data['slanderEndMonth'] ? (
                  <FormConfirm
                    title="誹謗中傷を受けた期間"
                    item={
                      data['slanderStartYear'] +
                      '年' +
                      data['slanderStartMonth'] +
                      '月 〜 ' +
                      data['slanderEndYear'] +
                      '年' +
                      data['slanderEndMonth'] +
                      '月'
                    }
                    required={true}
                  />
                ) : null}
                {data['damageAmount'] ? (
                  <FormConfirm
                    title="損害賠償請求額"
                    item={data['damageAmount'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['existsDelayPayment'] ? (
                  <FormConfirm
                    title="遅延損害金請求の有無"
                    item={data['existsDelayPayment'] ? '有' : '無'}
                    required={true}
                  />
                ) : null}
                {data['delayPayment'] ? (
                  <FormConfirm
                    title="遅延損害金の利率"
                    item={'年' + data['delayPayment'] + '%'}
                  />
                ) : null}
                {data['delayPaymentStartType'] ? (
                  <FormConfirm
                    title="遅延損害金の発生開始日"
                    item={
                      data['delayPaymentStartType'] === 1
                        ? '訴状送達の日の翌日'
                        : 'その他'
                    }
                  />
                ) : null}
                {data['delayPaymentStartType'] === 2 &&
                data['delayPaymentStartDate'] ? (
                  <FormConfirm
                    title="遅延損害金の発生開始日"
                    item={formatDate(data['delayPaymentStartDate'])}
                  />
                ) : null}
                {data['execute'] ? (
                  <FormConfirm
                    title="仮処分命令の有無"
                    item={data['execute'] ? '有' : '無'}
                    required={true}
                  />
                ) : null}
                {data['url'] ? (
                  <FormConfirm
                    title="誹謗中傷に該当する投稿のURL"
                    item={data['url']}
                    required={true}
                  />
                ) : null}
                {data['accountId'] ? (
                  <FormConfirm
                    title="誹謗中傷に該当する投稿をしたアカウントのID"
                    item={data['accountId']}
                    required={true}
                  />
                ) : null}
                {data['postedDate'] ||
                data['postedHour'] ||
                data['postedMinute'] ? (
                  <FormConfirm
                    title="誹謗中傷に該当する投稿の投稿日時"
                    item={
                      formatDate(data['postedDate']) +
                      (data['postedHour'] && data['postedMinute']
                        ? '　' +
                          data['postedHour'] +
                          '時' +
                          data['postedMinute'] +
                          '分'
                        : '')
                    }
                    required={true}
                  />
                ) : null}
                {data['loginDate'] ? (
                  <FormConfirm
                    title="Twitter社より開示された、問題のツイートに近接したログイン日時"
                    item={formatDate(data['loginDate'])}
                    required={true}
                  />
                ) : null}
                {data['ipAddress'] ? (
                  <FormConfirm
                    title="Twitter社より開示された、問題のツイートに近接したログイン日時"
                    item={data['ipAddress']}
                    required={true}
                  />
                ) : null}
                {data['publishedInformation'] ? (
                  <FormConfirm
                    title="掲載された情報"
                    item={data['publishedInformation']}
                    required={true}
                  />
                ) : null}
                {data['infringementType'] ? (
                  <FormConfirm
                    title="侵害の種類"
                    item={
                      data['infringementType'] === 1
                        ? '名誉感情の侵害'
                        : '名誉毀損'
                    }
                    required={true}
                  />
                ) : null}
                {data['infringementReason'] ? (
                  <FormConfirm
                    title="権利が明らかに侵害されたとされる理由"
                    item={data['infringementReason']}
                    required={true}
                  />
                ) : null}
                {disclosureReasons.length > 0 ? (
                  <FormConfirm
                    title="発信者情報の開示を受けるべき正当な理由"
                    item={'・' + disclosureReasons.join('\n・')}
                    required={true}
                  />
                ) : null}
                {disclosureInformation.length > 0 ? (
                  <FormConfirm
                    title="開示を請求する発信者情報"
                    item={'・' + disclosureInformation.join('\n・')}
                    required={true}
                  />
                ) : null}
                {undisclosureInformation.length > 0 ? (
                  <FormConfirm
                    title="発信者に示したくない私の情報"
                    item={'・' + undisclosureInformation.join('\n・')}
                    required={true}
                  />
                ) : null}
                {data['isIdentificated'] ? (
                  <FormConfirm
                    title="私（代理人弁護士）が、請求者が間違いなく本人であること を確認しています。"
                    item={data['isIdentificated'] ? 'はい' : 'いいえ'}
                    required={true}
                  />
                ) : null}
                {data['post'] ? (
                  <FormConfirm
                    title="投稿内容"
                    item={data['post']}
                    required={true}
                  />
                ) : null}
                {data['postedDate2'] ? (
                  <FormConfirm
                    title="誹謗中傷に該当する投稿の投稿日時"
                    item={formatDate(data['postedDate2'])}
                    required={true}
                  />
                ) : null}
                {data['post2'] ? (
                  <FormConfirm
                    title="投稿内容"
                    item={data['post2']}
                    required={true}
                  />
                ) : null}
                {data['isPointedFact'] ? (
                  <FormConfirm
                    title="事実の摘示の有無"
                    item={data['isPointedFact'] ? '有' : '無'}
                    required={true}
                  />
                ) : null}
                {data['service'] ? (
                  <FormConfirm
                    title="購入した商品名"
                    item={data['service']}
                    required={true}
                  />
                ) : null}
                {data['salesDate'] ? (
                  <FormConfirm
                    title="購入日"
                    item={formatDate(data['salesDate'])}
                    required={true}
                  />
                ) : null}
                {data['salesAmount'] ? (
                  <FormConfirm
                    title="購入金額"
                    item={data['salesAmount'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['coolingOffType'] ? (
                  <FormConfirm
                    title="クーリングオフ制度を主張する根拠"
                    item={
                      data['coolingOffType'] === 1
                        ? '法的書面を受け取ってから20日間以内'
                        : '法的書面を受け取っていない'
                    }
                    required={true}
                  />
                ) : null}
                {data['contentsCertificatedMailDate'] ? (
                  <FormConfirm
                    title="内容証明郵便の送付日"
                    item={formatDate(data['contentsCertificatedMailDate'])}
                    required={true}
                  />
                ) : null}
                {data['workStartDate'] ? (
                  <FormConfirm
                    title="勤務開始日"
                    item={formatDate(data['workStartDate'])}
                    required={true}
                  />
                ) : null}
                {data['workEndDate'] ? (
                  <FormConfirm
                    title="勤務終了日"
                    item={formatDate(data['workEndDate'])}
                    required={true}
                  />
                ) : null}
                {data['unpaidSalaryStartDate'] ? (
                  <FormConfirm
                    title="給料未払い期間"
                    item={
                      formatDate(data['unpaidSalaryStartDate']) +
                      ' 〜 ' +
                      formatDate(data['unpaidSalaryEndDate'])
                    }
                    required={true}
                  />
                ) : null}
                {data['unpaidSalary'] ? (
                  <FormConfirm
                    title="給料の未払い金額"
                    item={data['unpaidSalary']}
                    required={true}
                  />
                ) : null}
                {data['business'] ? (
                  <FormConfirm
                    title="事業内容"
                    item={data['business'] + '業'}
                    required={true}
                  />
                ) : null}
                {data['job'] ? (
                  <FormConfirm
                    title="仕事内容"
                    item={data['job']}
                    required={true}
                  />
                ) : null}
                {data['salaryType'] && data['salaryAmount'] ? (
                  <FormConfirm
                    title="給料"
                    item={
                      (data['salaryType'] === 1
                        ? '月給'
                        : data['salaryType'] === 2
                        ? '日給'
                        : '時給') +
                      data['salaryAmount'] +
                      '円'
                    }
                    required={true}
                  />
                ) : null}
                {data['paymentDueDay'] &&
                data['closingMonth'] &&
                data['closingDay'] ? (
                  <FormConfirm
                    title="支払期日"
                    item={
                      '毎月' +
                      data['paymentDueDay'] +
                      '日　' +
                      data['closingMonth'] +
                      '月' +
                      data['closingDay'] +
                      '日締め'
                    }
                    required={true}
                  />
                ) : null}
                {data['product'] ? (
                  <FormConfirm
                    title="商品名"
                    item={data['product']}
                    required={true}
                  />
                ) : null}
                {data['paymentDueDate'] ? (
                  <FormConfirm
                    title="支払期限"
                    item={formatDate(data['paymentDueDate'])}
                    required={true}
                  />
                ) : null}
                {data['paidAmount'] ? (
                  <FormConfirm
                    title="支払済の金額"
                    item={data['paidAmount']}
                    required={true}
                  />
                ) : null}
                {data['rentPostCode'] ? (
                  <FormConfirm
                    title="郵便番号"
                    item={data['rentPostCode']}
                    required={true}
                  />
                ) : null}
                {data['rentPrefecture'] ? (
                  <FormConfirm
                    title="都道府県"
                    item={data['rentPrefecture']}
                    required={true}
                  />
                ) : null}
                {data['rentCity'] ? (
                  <FormConfirm
                    title="市区町村・番地"
                    item={data['rentCity']}
                    required={true}
                  />
                ) : null}
                {data['rentBuilding'] ? (
                  <FormConfirm
                    title="建物名・部屋番号など"
                    item={data['rentBuilding']}
                    required={true}
                  />
                ) : null}
                {data['rent'] ? (
                  <FormConfirm
                    title="家賃"
                    item={data['rent']}
                    required={true}
                  />
                ) : null}
                {data['expenses'] ? (
                  <FormConfirm
                    title="管理費"
                    item={data['expenses']}
                    required={true}
                  />
                ) : null}
                {data['depositAmount'] ? (
                  <FormConfirm
                    title="敷金"
                    item={data['depositAmount']}
                    required={true}
                  />
                ) : null}
                {data['leavingDate'] ? (
                  <FormConfirm
                    title="退去日"
                    item={formatDate(data['leavingDate'])}
                    required={true}
                  />
                ) : null}
                {data['contractDate'] ? (
                  <FormConfirm
                    title="契約日"
                    item={formatDate(data['contractDate'])}
                    required={true}
                  />
                ) : null}
                {data['leasePeriod'] ? (
                  <FormConfirm
                    title="賃借期間"
                    item={data['leasePeriod'] + '年'}
                    required={true}
                  />
                ) : null}
                {data['contractEndDate'] ? (
                  <FormConfirm
                    title="契約終了日"
                    item={formatDate(data['contractEndDate'])}
                    required={true}
                  />
                ) : null}
                {data['dueDate'] ? (
                  <FormConfirm
                    title="内容証明郵便の対応期限"
                    item={data['dueDate'] + '日以内'}
                    required={true}
                  />
                ) : null}
                {data['accidentDate'] &&
                data['accidentHour'] &&
                data['accidentMinute'] ? (
                  <FormConfirm
                    title="事故発生日時"
                    item={
                      formatDate(data['accidentDate']) +
                      '　' +
                      data['accidentHour'] +
                      '時' +
                      data['accidentMinute'] +
                      '分頃'
                    }
                    required={true}
                  />
                ) : null}
                {data['accidentLocation'] ? (
                  <FormConfirm
                    title="事故発生場所"
                    item={data['accidentLocation']}
                    required={true}
                  />
                ) : null}
                {data['vehicleType'] ? (
                  <FormConfirm
                    title="あなた（通告人）の車両の種類"
                    item={data['vehicleType']}
                    required={true}
                  />
                ) : null}
                {data['oppositeVehicleType'] ? (
                  <FormConfirm
                    title="相手方（被通告人）の車両の種類"
                    item={data['oppositeVehicleType']}
                    required={true}
                  />
                ) : null}
                {data['accidentReason'] ? (
                  <FormConfirm
                    title="事故の原因"
                    item={data['accidentReason']}
                    required={true}
                  />
                ) : null}
                {data['repairCost'] ? (
                  <FormConfirm
                    title="修理費"
                    item={data['repairCost'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['valuationLoss'] ? (
                  <FormConfirm
                    title="格落ち損(評価損)"
                    item={data['valuationLoss'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['rentalCost'] ? (
                  <FormConfirm
                    title="代車料"
                    item={data['rentalCost'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['replacementCost'] ? (
                  <FormConfirm
                    title="買替差額"
                    item={data['replacementCost'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['registrationExpenses'] ? (
                  <FormConfirm
                    title="登録手続関係費"
                    item={data['registrationExpenses'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['suspensionLoss'] ? (
                  <FormConfirm
                    title="休車損害"
                    item={data['suspensionLoss'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['isEmployer'] ? (
                  <FormConfirm
                    title="相手方1は、相手方2の使用者である。"
                    item={data['isEmployer'] ? 'はい' : 'いいえ'}
                    required={true}
                  />
                ) : null}
                {data['accidentDescription'] ? (
                  <FormConfirm
                    title="事故の状況"
                    item={data['accidentDescription']}
                    required={true}
                  />
                ) : null}
                {data['loanAmount'] ? (
                  <FormConfirm
                    title="貸付金額"
                    item={data['loanAmount'] + '円'}
                    required={true}
                  />
                ) : null}
                {data['loanDate'] ? (
                  <FormConfirm
                    title="貸付日"
                    item={formatDate(data['loanDate'])}
                    required={true}
                  />
                ) : null}
                {data['existsReturnDate'] ? (
                  <FormConfirm
                    title="返還時期の定めの有無"
                    item={data['existsReturnDate'] ? '有' : '無'}
                    required={true}
                  />
                ) : null}
                {data['returnDate'] ? (
                  <FormConfirm
                    title={
                      data['existsReturnDate']
                        ? '返還時期（貸付金の返還を約束した日付）'
                        : '返還を申し入れた日付'
                    }
                    item={formatDate(data['returnDate'])}
                    required={true}
                  />
                ) : null}
                {data['interest'] ? (
                  <FormConfirm
                    title="利息"
                    item={'年' + data['interest'] + '%'}
                    required={true}
                  />
                ) : null}
                {data['returnAmount'] ? (
                  <FormConfirm
                    title="一部返済済の金額"
                    item={data['returnAmount']}
                    required={true}
                  />
                ) : null}
                {data['partialReturnDate'] ? (
                  <FormConfirm
                    title="一部金額が返済された日"
                    item={formatDate(data['partialReturnDate'])}
                    required={true}
                  />
                ) : null}
                {data['interestStartDate'] && data['interestEndDate'] ? (
                  <FormConfirm
                    title="利息の発生期間"
                    item={
                      formatDate(data['interestStartDate']) +
                      ' 〜　' +
                      formatDate(data['interestEndDate'])
                    }
                    required={true}
                  />
                ) : null}
                {data['isTargetAccount'] ? (
                  <FormConfirm
                    title="誹謗中傷の対象である原告のアカウント名が、本名ではなくハンドルネームである"
                    item={data['isTargetAccount'] ? 'はい' : 'いいえ'}
                    required={true}
                  />
                ) : null}
                {data['accountName'] ? (
                  <FormConfirm
                    title="誹謗中傷の対象であるアカウント名"
                    item={data['accountName']}
                    required={true}
                  />
                ) : null}
                {data['agreement'] ? (
                  <FormConfirm
                    title="その他の特約"
                    item={data['agreement']}
                    required={true}
                  />
                ) : null}
                {data['reference'] ? (
                  <FormConfirm
                    title="その他の参考事項"
                    item={data['reference']}
                    required={true}
                  />
                ) : null}
                {attachmentDocuments.length > 0 ? (
                  <FormConfirm
                    title="添付書類"
                    item={attachmentDocuments.join('、')}
                    required={true}
                  />
                ) : null}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.text}>まだ書類が作成されていません。</Text>
              <Text style={styles.text}>
                書類作成画面で「保存」を押下すると、{'\n'}
                本画面に編集内容が反映されます。
              </Text>
            </>
          )}
        </>
      </ScrollView>
      <View style={styles.wrapper}>
        {[
          '内容証明郵便',
          '仮処分命令申立書',
          '上申書',
          '無担保上申書',
          'アクセスログ保存要請書',
          '発信者情報開示請求書',
        ].indexOf(variable) !== -1 ? (
          <>
            <Button
              title="Word出力"
              type="outline"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              containerStyle={styles.buttonContainer}
              onPress={() => {
                if (data !== null) createDoc(1);
              }}
            />
            <Button
              title="PDF出力"
              type="outline"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              containerStyle={styles.buttonContainer}
              onPress={() => {
                if (data !== null) createDoc(2);
              }}
            />
          </>
        ) : null}
        {variable == '訴状' ? (
          <>
            <Button
              title="Excel出力"
              type="outline"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              containerStyle={styles.buttonContainer}
              onPress={() => {
                if (data !== null) createDoc(1);
              }}
            />
            <Button
              title="PDF出力（対応予定）"
              type="outline"
              buttonStyle={styles.grayButton}
              titleStyle={styles.grayButtonTitle}
              containerStyle={styles.buttonContainer}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};

export default DocumentConfirmScreen;
