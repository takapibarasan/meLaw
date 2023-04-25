import React, { FC, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import DelayedDamage from '../../molecules/DelayedDamage';
import SecurityDepositTemplate from '../ContentsCertificatedMail/SecurityDeposit';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  rentPostCode: string;
  rentPrefecture: string;
  rentCity: string;
  rentBuilding: string;
  rent: string;
  expenses: string;
  depositAmount: string;
  leavingDate: firebase.firestore.Timestamp | null;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  execute: boolean;
  contractDate: firebase.firestore.Timestamp | null;
  leasePeriod: string;
  agreement: string;
  contractEndDate: firebase.firestore.Timestamp | null;
  reference: string;
  existsContract: boolean;
  existsCertificate: boolean;
  existsContentsCertifiedMail: boolean;
  existsDeliveryCertificate: boolean;
  existsReceipt: boolean;
  setRentPostCode: React.Dispatch<React.SetStateAction<string>>;
  setRentPrefecture: React.Dispatch<React.SetStateAction<string>>;
  setRentCity: React.Dispatch<React.SetStateAction<string>>;
  setRentBuilding: React.Dispatch<React.SetStateAction<string>>;
  setRent: React.Dispatch<React.SetStateAction<string>>;
  setExpenses: React.Dispatch<React.SetStateAction<string>>;
  setDepositAmount: React.Dispatch<React.SetStateAction<string>>;
  setLeavingDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  setContractDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setLeasePeriod: React.Dispatch<React.SetStateAction<string>>;
  setAgreement: React.Dispatch<React.SetStateAction<string>>;
  setContractEndDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setReference: React.Dispatch<React.SetStateAction<string>>;
  setExistsContract: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsCertificate: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsContentsCertifiedMail: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsDeliveryCertificate: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsReceipt: React.Dispatch<React.SetStateAction<boolean>>;
};
const SecurityDeposit: FC<Props> = ({
  rentPostCode,
  rentPrefecture,
  rentCity,
  rentBuilding,
  rent,
  expenses,
  depositAmount,
  leavingDate,
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
  execute,
  contractDate,
  leasePeriod,
  agreement,
  contractEndDate,
  reference,
  existsContract,
  existsCertificate,
  existsContentsCertifiedMail,
  existsDeliveryCertificate,
  existsReceipt,
  setRentPostCode,
  setRentPrefecture,
  setRentCity,
  setRentBuilding,
  setRent,
  setExpenses,
  setDepositAmount,
  setLeavingDate,
  setExistsDelayPayment,
  setDelayPayment,
  setDelayPaymentStartType,
  setDelayPaymentStartDate,
  setExecute,
  setContractDate,
  setLeasePeriod,
  setAgreement,
  setContractEndDate,
  setReference,
  setExistsContract,
  setExistsCertificate,
  setExistsContentsCertifiedMail,
  setExistsDeliveryCertificate,
  setExistsReceipt,
}) => {
  return (
    <>
      <SecurityDepositTemplate
        rentPostCode={rentPostCode}
        rentPrefecture={rentPrefecture}
        rentCity={rentCity}
        rentBuilding={rentBuilding}
        rent={rent}
        expenses={expenses}
        depositAmount={depositAmount}
        leavingDate={leavingDate}
        setRentPostCode={setRentPostCode}
        setRentPrefecture={setRentPrefecture}
        setRentCity={setRentCity}
        setRentBuilding={setRentBuilding}
        setRent={setRent}
        setExpenses={setExpenses}
        setDepositAmount={setDepositAmount}
        setLeavingDate={setLeavingDate}
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
      <Text style={styles.label}>契約日</Text>
      <DateTemplate date={contractDate} setDate={setContractDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>賃借期間</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        定めなしの場合、記載不要です。
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={(value) => setLeasePeriod(value)}
          value={leasePeriod}
        />
        <Text style={styles.text}>年</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>敷金返還についての約定</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="建物明渡しの1ヶ月後に返還する。"
        onChangeText={(value) => setAgreement(value)}
        value={agreement}
      />
      <Text style={styles.label}>賃貸借契約終了日</Text>
      <DateTemplate date={contractEndDate} setDate={setContractEndDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        被告が敷金を支払わない理由など被告の言い分や、この紛争について他に参考となることなどを記載ください。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="被告は、敷金をリフォーム費用に充当したので、返すべき敷金はないと言って支払おうとしない。"
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
        {'\n'}
        また、あなた又は相手方が会社の場合は登記事項証明書（商業登記簿謄本）が必要ですので、合わせて提出ください。
      </Text>
      <CheckBox
        title="賃貸借契約書"
        checked={existsContract}
        onPress={() => setExistsContract(!existsContract)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={existsCertificate}
        onPress={() => setExistsCertificate(!existsCertificate)}
      />
      <CheckBox
        title="内容証明郵便"
        checked={existsContentsCertifiedMail}
        onPress={() =>
          setExistsContentsCertifiedMail(!existsContentsCertifiedMail)
        }
      />
      <CheckBox
        title="配達証明書"
        checked={existsDeliveryCertificate}
        onPress={() => setExistsDeliveryCertificate(!existsDeliveryCertificate)}
      />
      <CheckBox
        title="敷金領収書"
        checked={existsReceipt}
        onPress={() => setExistsReceipt(!existsReceipt)}
      />
    </>
  );
};

export default SecurityDeposit;
