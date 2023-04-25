import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import TrafficAccidentTemplate from '../ContentsCertificatedMail/TrafficAccident';
import DelayedDamage from '../../molecules/DelayedDamage';
import { styles } from '../../../styles/form';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  accidentDate: firebase.firestore.Timestamp | null;
  accidentHour: string;
  accidentMinute: string;
  accidentLocation: string;
  vehicleType: string;
  oppositeVehicleType: string;
  accidentReason: string;
  repairCost: string;
  valuationLoss: string;
  rentalCost: string;
  replacementCost: string;
  registrationExpenses: string;
  suspensionLoss: string;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  execute: boolean;
  isEmployer: boolean;
  accidentDescription: string;
  reference: string;
  existsAccidentCertificate: boolean;
  existsMemorandum: boolean;
  existsPhoto: boolean;
  existsReceipt: boolean;
  existsEstimate: boolean;
  existsDiagram: boolean;
  existsCertificate: boolean;
  setAccidentDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setAccidentHour: React.Dispatch<React.SetStateAction<string>>;
  setAccidentMinute: React.Dispatch<React.SetStateAction<string>>;
  setAccidentLocation: React.Dispatch<React.SetStateAction<string>>;
  setVehicleType: React.Dispatch<React.SetStateAction<string>>;
  setOppositeVehicleType: React.Dispatch<React.SetStateAction<string>>;
  setAccidentReason: React.Dispatch<React.SetStateAction<string>>;
  setRepairCost: React.Dispatch<React.SetStateAction<string>>;
  setValuationLoss: React.Dispatch<React.SetStateAction<string>>;
  setRentalCost: React.Dispatch<React.SetStateAction<string>>;
  setReplacementCost: React.Dispatch<React.SetStateAction<string>>;
  setRegistrationExpenses: React.Dispatch<React.SetStateAction<string>>;
  setSuspensionLoss: React.Dispatch<React.SetStateAction<string>>;
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmployer: React.Dispatch<React.SetStateAction<boolean>>;
  setAccidentDescription: React.Dispatch<React.SetStateAction<string>>;
  setReference: React.Dispatch<React.SetStateAction<string>>;
  setExistsAccidentCertificate: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsMemorandum: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsPhoto: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsReceipt: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsEstimate: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsDiagram: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsCertificate: React.Dispatch<React.SetStateAction<boolean>>;
};
const TrafficAccident: FC<Props> = ({
  accidentDate,
  accidentHour,
  accidentMinute,
  accidentLocation,
  vehicleType,
  oppositeVehicleType,
  accidentReason,
  repairCost,
  valuationLoss,
  rentalCost,
  replacementCost,
  registrationExpenses,
  suspensionLoss,
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
  execute,
  isEmployer,
  accidentDescription,
  reference,
  existsAccidentCertificate,
  existsMemorandum,
  existsPhoto,
  existsReceipt,
  existsEstimate,
  existsDiagram,
  existsCertificate,
  setAccidentDate,
  setAccidentHour,
  setAccidentMinute,
  setAccidentLocation,
  setVehicleType,
  setOppositeVehicleType,
  setAccidentReason,
  setRepairCost,
  setValuationLoss,
  setRentalCost,
  setReplacementCost,
  setRegistrationExpenses,
  setSuspensionLoss,
  setExistsDelayPayment,
  setDelayPayment,
  setDelayPaymentStartType,
  setDelayPaymentStartDate,
  setExecute,
  setIsEmployer,
  setAccidentDescription,
  setReference,
  setExistsAccidentCertificate,
  setExistsMemorandum,
  setExistsPhoto,
  setExistsReceipt,
  setExistsEstimate,
  setExistsDiagram,
  setExistsCertificate,
}) => {
  return (
    <>
      <TrafficAccidentTemplate
        accidentDate={accidentDate}
        accidentHour={accidentHour}
        accidentMinute={accidentMinute}
        accidentLocation={accidentLocation}
        vehicleType={vehicleType}
        oppositeVehicleType={oppositeVehicleType}
        accidentReason={accidentReason}
        repairCost={repairCost}
        valuationLoss={valuationLoss}
        rentalCost={rentalCost}
        replacementCost={replacementCost}
        registrationExpenses={registrationExpenses}
        suspensionLoss={suspensionLoss}
        setAccidentDate={setAccidentDate}
        setAccidentHour={setAccidentHour}
        setAccidentMinute={setAccidentMinute}
        setAccidentLocation={setAccidentLocation}
        setVehicleType={setVehicleType}
        setOppositeVehicleType={setOppositeVehicleType}
        setAccidentReason={setAccidentReason}
        setRepairCost={setRepairCost}
        setValuationLoss={setValuationLoss}
        setRentalCost={setRentalCost}
        setReplacementCost={setReplacementCost}
        setRegistrationExpenses={setRegistrationExpenses}
        setSuspensionLoss={setSuspensionLoss}
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
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故の状況</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textarea}
        placeholder="交差点手前の停止線で原告運転の車が停止していたところ、後ろから来て前をよく見ていなかった被告1運転の車が原告運転の車の後部に衝突し、原告運転の車の後部バンパーやバックライト部分がこわれた"
        multiline={true}
        onChangeText={(value) => setAccidentDescription(value)}
        value={accidentDescription}
      />
      <CheckBox
        containerStyle={{ marginTop: 40 }}
        title="相手方1は、相手方2の使用者である。"
        checked={isEmployer}
        onPress={() => setIsEmployer(!isEmployer)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>参考情報</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        被告の言い分や、この紛争について他に参考となることなどを記載ください。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="被告らは、被告2が掛けている保険で原告が運転していた車の修理代金などを支払うと約束していたのに現在まで全く支払おうとしない"
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
        なお、事故状況説明図とは、事故のあった交差点や道路などの簡単な地図に、
        事故のあったときの原告運転の車と被告運転の車の位置関係や、衝突した位置等を簡単に書き込むことによって、
        事故の様子を表した図面のことです。
        保険会社等により作成される場合がありますが、無ければ、ご自身で簡単な図面を作成ください。
      </Text>
      <CheckBox
        title="交通事故証明書"
        checked={existsAccidentCertificate}
        onPress={() => setExistsAccidentCertificate(!existsAccidentCertificate)}
      />
      <CheckBox
        title="示談書・念書"
        checked={existsMemorandum}
        onPress={() => setExistsMemorandum(!existsMemorandum)}
      />
      <CheckBox
        title="車等の損傷部分の写真"
        checked={existsPhoto}
        onPress={() => setExistsPhoto(!existsPhoto)}
      />
      <CheckBox
        title="領収書"
        checked={existsReceipt}
        onPress={() => setExistsReceipt(!existsReceipt)}
      />
      <CheckBox
        title="車等の修理代金見積書"
        checked={existsEstimate}
        onPress={() => setExistsEstimate(!existsEstimate)}
      />
      <CheckBox
        title="事故状況説明図"
        checked={existsDiagram}
        onPress={() => setExistsDiagram(!existsDiagram)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={existsCertificate}
        onPress={() => setExistsCertificate(!existsCertificate)}
      />
    </>
  );
};

export default TrafficAccident;
