import React, { FC, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import DelayedDamage from '../../molecules/DelayedDamage';
import InformationTemplate from '../ContentsCertificatedMail/Information';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  service: string;
  salesDate: firebase.firestore.Timestamp | null;
  salesAmount: string;
  coolingOffType: number;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  execute: boolean;
  contentsCertificatedMailDate: firebase.firestore.Timestamp | null;
  existsContract: boolean;
  existsReceipt: boolean;
  existsEmail: boolean;
  existsTranscriptCopy: boolean;
  existsScreenShot: boolean;
  setService: React.Dispatch<React.SetStateAction<string>>;
  setSalesDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setSalesAmount: React.Dispatch<React.SetStateAction<string>>;
  setCoolingOffType: React.Dispatch<React.SetStateAction<number>>;
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  setContentsCertificatedMailDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExistsContract: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsReceipt: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsTranscriptCopy: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsScreenShot: React.Dispatch<React.SetStateAction<boolean>>;
};
const Information: FC<Props> = ({
  service,
  salesDate,
  salesAmount,
  coolingOffType,
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
  execute,
  contentsCertificatedMailDate,
  existsContract,
  existsReceipt,
  existsEmail,
  existsTranscriptCopy,
  existsScreenShot,
  setService,
  setSalesDate,
  setSalesAmount,
  setCoolingOffType,
  setExistsDelayPayment,
  setDelayPayment,
  setDelayPaymentStartType,
  setDelayPaymentStartDate,
  setExecute,
  setContentsCertificatedMailDate,
  setExistsContract,
  setExistsReceipt,
  setExistsEmail,
  setExistsTranscriptCopy,
  setExistsScreenShot,
}) => {
  return (
    <>
      <InformationTemplate
        service={service}
        salesDate={salesDate}
        salesAmount={salesAmount}
        coolingOffType={coolingOffType}
        setService={setService}
        setSalesDate={setSalesDate}
        setSalesAmount={setSalesAmount}
        setCoolingOffType={setCoolingOffType}
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
        <Text style={styles.label}>内容証明郵便の送付日</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <DateTemplate
        date={contentsCertificatedMailDate}
        setDate={setContentsCertificatedMailDate}
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
        title="商品購入の際の領収書"
        checked={existsReceipt}
        onPress={() => setExistsReceipt(!existsReceipt)}
      />
      <CheckBox
        title=" 被告（相手方）から購入した際の連絡記録（E-mail）"
        checked={existsEmail}
        onPress={() => setExistsEmail(!existsEmail)}
      />
      <CheckBox
        title="内容証明郵便を被告（相手方）に送付した記録（謄本の控え）"
        checked={existsTranscriptCopy}
        onPress={() => setExistsTranscriptCopy(!existsTranscriptCopy)}
      />
      <CheckBox
        title="商品が販売されていたWebサイトのスクリーンショット"
        checked={existsScreenShot}
        onPress={() => setExistsScreenShot(!existsScreenShot)}
      />
      <CheckBox
        title="契約書"
        checked={existsContract}
        onPress={() => setExistsContract(!existsContract)}
      />
    </>
  );
};

export default Information;
