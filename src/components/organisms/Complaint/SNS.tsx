import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import DelayedDamage from '../../molecules/DelayedDamage';
import { styles } from '../../../styles/form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import SNSTemplate from '../ContentsCertificatedMail/SNS';

type Props = {
  accountName: string;
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
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  execute: boolean;
  existsEvidence: boolean;
  existsDisclosureDocument: boolean;
  existsProviderDocument: boolean;
  providerName: string;
  isTargetAccount: boolean;
  existsPosts: boolean;
  setAccountName: React.Dispatch<React.SetStateAction<string>>;
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
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsEvidence: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsDisclosureDocument: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsProviderDocument: React.Dispatch<React.SetStateAction<boolean>>;
  setProviderName: React.Dispatch<React.SetStateAction<string>>;
  setIsTargetAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsPosts: React.Dispatch<React.SetStateAction<boolean>>;
};
const SNS: FC<Props> = ({
  accountName,
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
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
  execute,
  existsEvidence,
  existsDisclosureDocument,
  existsProviderDocument,
  providerName,
  isTargetAccount,
  existsPosts,
  setAccountName,
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
  setExistsDelayPayment,
  setDelayPayment,
  setDelayPaymentStartType,
  setDelayPaymentStartDate,
  setExecute,
  setExistsEvidence,
  setExistsDisclosureDocument,
  setExistsProviderDocument,
  setProviderName,
  setIsTargetAccount,
  setExistsPosts,
}) => {
  return (
    <>
      <SNSTemplate
        oppositeAccountName={oppositeAccountName}
        slanderStartYear={slanderStartYear}
        slanderStartMonth={slanderStartMonth}
        slanderEndYear={slanderEndYear}
        slanderEndMonth={slanderEndMonth}
        postedDate={postedDate}
        post={post}
        postedDate2={postedDate2}
        post2={post2}
        isPointedFact={isPointedFact}
        damageAmount={damageAmount}
        setOppositeAccountName={setOppositeAccountName}
        setSlanderStartYear={setSlanderStartYear}
        setSlanderStartMonth={setSlanderStartMonth}
        setSlanderEndYear={setSlanderEndYear}
        setSlanderEndMonth={setSlanderEndMonth}
        setPostedDate={setPostedDate}
        setPost={setPost}
        setPostedDate2={setPostedDate2}
        setPost2={setPost2}
        setIsPointedFact={setIsPointedFact}
        setDamageAmount={setDamageAmount}
      />
      <DelayedDamage
        existsDelayPayment={existsDelayPayment}
        delayPayment={delayPayment}
        delayPaymentStartType={delayPaymentStartType}
        delayPaymentStartDate={delayPaymentStartDate}
        setExistsDelayPayment={setExistsDelayPayment}
        setDelayPayment={setDelayPayment}
        setDelayPaymentStartType={setDelayPaymentStartType}
        setDelayPaymentStartDate={setDelayPaymentStartDate}
      />
      <CheckBox
        containerStyle={{ marginTop: 40 }}
        title="仮執行の有無"
        checked={execute}
        onPress={() => setExecute(!execute)}
      />
      <Text style={styles.inputDescription}>
        この事件の判決が確定する前に判決の内容に基づいて強制執行をしたいときにはチェックしてください。
      </Text>
      <CheckBox
        containerStyle={{ marginTop: 20 }}
        title="誹謗中傷の対象である原告のアカウント名が、本名ではなくハンドルネームである"
        checked={isTargetAccount}
        onPress={() => setIsTargetAccount(!isTargetAccount)}
      />
      <Text style={styles.inputDescription}>
        ハンドルネームに対する誹謗中傷の場合、周囲が個人を特定できるハンドルネームであることが必要となります。
      </Text>
      {isTargetAccount ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>誹謗中傷の対象であるアカウント名</Text>
            <Text style={styles.required}>必須</Text>
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setAccountName(value)}
            value={accountName}
          />
        </>
      ) : null}

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>プロバイダー名</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setProviderName(value)}
        value={providerName}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>添付書類</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        以下の証拠書類があればチェックください。それぞれの添付書類は写しを2通（相手方が2名のときは3通）
        準備して、訴状と一緒に提出ください。
      </Text>
      <CheckBox
        title="誹謗中傷を受けた証拠（名誉棄損に該当する投稿内容）"
        checked={existsEvidence}
        onPress={() => setExistsEvidence(!existsEvidence)}
      />
      <CheckBox
        title="Twitter社より開示されたIPアドレスが記載された書類"
        checked={existsDisclosureDocument}
        onPress={() => setExistsDisclosureDocument(!existsDisclosureDocument)}
      />
      <CheckBox
        title="プロバイダより開示された被告の情報が記載された書類"
        checked={existsProviderDocument}
        onPress={() => setExistsProviderDocument(!existsProviderDocument)}
      />
      <CheckBox
        title="名誉棄損に該当する投稿が原告に向けたものであることを示す、被告による投稿内容"
        checked={existsPosts}
        onPress={() => setExistsPosts(!existsPosts)}
      />
    </>
  );
};

export default SNS;
