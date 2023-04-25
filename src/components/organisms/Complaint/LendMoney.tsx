import React, { FC, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Duration from '../../molecules/Duration';
import LendMoneyTemplate from '../ContentsCertificatedMail/LendMoney';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  loanAmount: string;
  loanDate: firebase.firestore.Timestamp | null;
  existsReturnDate: boolean;
  returnDate: firebase.firestore.Timestamp | null;
  interest: string;
  existsDelayPayment: boolean;
  delayPayment: string;
  returnAmount: string;
  partialReturnDate: firebase.firestore.Timestamp | null;
  execute: boolean;
  interestStartDate: firebase.firestore.Timestamp | null;
  interestEndDate: firebase.firestore.Timestamp | null;
  agreement: string;
  reference: string;
  existsContract: boolean;
  existsAcknowledgement: boolean;
  existsMemorandum: boolean;
  existsCertificate: boolean;
  setLoanAmount: React.Dispatch<React.SetStateAction<string>>;
  setLoanDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExistsReturnDate: React.Dispatch<React.SetStateAction<boolean>>;
  setReturnDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setInterest: React.Dispatch<React.SetStateAction<string>>;
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setReturnAmount: React.Dispatch<React.SetStateAction<string>>;
  setPartialReturnDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  setInterestStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setInterestEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setAgreement: React.Dispatch<React.SetStateAction<string>>;
  setReference: React.Dispatch<React.SetStateAction<string>>;
  setExistsContract: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsAcknowledgement: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsMemorandum: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsCertificate: React.Dispatch<React.SetStateAction<boolean>>;
};
const LendMoney: FC<Props> = ({
  loanAmount,
  loanDate,
  existsReturnDate,
  returnDate,
  interest,
  existsDelayPayment,
  delayPayment,
  returnAmount,
  partialReturnDate,
  execute,
  interestStartDate,
  interestEndDate,
  agreement,
  reference,
  existsContract,
  existsAcknowledgement,
  existsMemorandum,
  existsCertificate,
  setLoanAmount,
  setLoanDate,
  setExistsReturnDate,
  setReturnDate,
  setInterest,
  setExistsDelayPayment,
  setDelayPayment,
  setReturnAmount,
  setPartialReturnDate,
  setExecute,
  setInterestStartDate,
  setInterestEndDate,
  setAgreement,
  setReference,
  setExistsContract,
  setExistsAcknowledgement,
  setExistsMemorandum,
  setExistsCertificate,
}) => {
  return (
    <>
      <LendMoneyTemplate
        loanAmount={loanAmount}
        loanDate={loanDate}
        existsReturnDate={existsReturnDate}
        returnDate={returnDate}
        interest={interest}
        existsDelayPayment={existsDelayPayment}
        delayPayment={delayPayment}
        returnAmount={returnAmount}
        setLoanAmount={setLoanAmount}
        setLoanDate={setLoanDate}
        setExistsReturnDate={setExistsReturnDate}
        setReturnDate={setReturnDate}
        setInterest={setInterest}
        setExistsDelayPayment={setExistsDelayPayment}
        setDelayPayment={setDelayPayment}
        setReturnAmount={setReturnAmount}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>一部金額が返済された日</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <DateTemplate date={partialReturnDate} setDate={setPartialReturnDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利息の支払期間</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Duration
        startDate={interestStartDate}
        endDate={interestEndDate}
        setStartDate={setInterestStartDate}
        setEndDate={setInterestEndDate}
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の特約</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        その他の特約を定めていれば、記載ください。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="返済金は、元本、利息、遅延損害金の順に充当する"
        multiline={true}
        onChangeText={(value) => setAgreement(value)}
        value={agreement}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考事項</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        相手方が返済しない理由や相手の言い分など、この紛争について他に参考になることを記載ください。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="被告らは自動車の修理代金を相殺したと言って支払おうとしない"
        multiline={true}
        onChangeText={(value) => setReference(value)}
        value={reference}
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
        title="契約書"
        checked={existsContract}
        onPress={() => setExistsContract(!existsContract)}
      />
      <CheckBox
        title="借用書"
        checked={existsAcknowledgement}
        onPress={() => setExistsAcknowledgement(!existsAcknowledgement)}
      />
      <CheckBox
        title="念書"
        checked={existsMemorandum}
        onPress={() => setExistsMemorandum(!existsMemorandum)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={existsCertificate}
        onPress={() => setExistsCertificate(!existsCertificate)}
      />
    </>
  );
};

export default LendMoney;
