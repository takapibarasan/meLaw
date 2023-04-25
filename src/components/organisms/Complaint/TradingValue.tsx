import React, { FC, useEffect, useState } from 'react';
import { Text, CheckBox } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import TradingValueTemplate from '../ContentsCertificatedMail/TradingValue';
import DelayedDamage from '../../molecules/DelayedDamage';
import { styles } from '../../../styles/form';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  product: string;
  salesDate: firebase.firestore.Timestamp | null;
  salesAmount: string;
  paymentDueDate: firebase.firestore.Timestamp | null;
  paidAmount: string;
  existsDelayPayment: boolean;
  delayPayment: string;
  delayPaymentStartType: number;
  delayPaymentStartDate: firebase.firestore.Timestamp | null;
  execute: boolean;
  business: string;
  reference: string;
  existsContract: boolean;
  existsInvoice: boolean;
  existsDeliveryNote: boolean;
  existsReceipt: boolean;
  existsCertificate: boolean;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
  setSalesDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setSalesAmount: React.Dispatch<React.SetStateAction<string>>;
  setPaymentDueDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setPaidAmount: React.Dispatch<React.SetStateAction<string>>;
  setExistsDelayPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setDelayPayment: React.Dispatch<React.SetStateAction<string>>;
  setDelayPaymentStartType: React.Dispatch<React.SetStateAction<number>>;
  setDelayPaymentStartDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  setExecute: React.Dispatch<React.SetStateAction<boolean>>;
  setBusiness: React.Dispatch<React.SetStateAction<string>>;
  setReference: React.Dispatch<React.SetStateAction<string>>;
  setExistsContract: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsInvoice: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsDeliveryNote: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsReceipt: React.Dispatch<React.SetStateAction<boolean>>;
  setExistsCertificate: React.Dispatch<React.SetStateAction<boolean>>;
};
const TradingValue: FC<Props> = ({
  product,
  salesDate,
  salesAmount,
  paymentDueDate,
  paidAmount,
  existsDelayPayment,
  delayPayment,
  delayPaymentStartType,
  delayPaymentStartDate,
  execute,
  business,
  reference,
  existsContract,
  existsInvoice,
  existsDeliveryNote,
  existsReceipt,
  existsCertificate,
  setProduct,
  setSalesDate,
  setSalesAmount,
  setPaymentDueDate,
  setPaidAmount,
  setExistsDelayPayment,
  setDelayPayment,
  setDelayPaymentStartType,
  setDelayPaymentStartDate,
  setExecute,
  setBusiness,
  setReference,
  setExistsContract,
  setExistsInvoice,
  setExistsDeliveryNote,
  setExistsReceipt,
  setExistsCertificate,
}) => {
  return (
    <>
      <TradingValueTemplate
        product={product}
        salesDate={salesDate}
        salesAmount={salesAmount}
        paymentDueDate={paymentDueDate}
        paidAmount={paidAmount}
        setProduct={setProduct}
        setSalesDate={setSalesDate}
        setSalesAmount={setSalesAmount}
        setPaymentDueDate={setPaymentDueDate}
        setPaidAmount={setPaidAmount}
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
        <Text style={styles.label}>あなた（通告人）の事業内容</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInput}
          placeholder="酒類販売"
          onChangeText={(value) => setBusiness(value)}
          value={business}
        />
        <Text style={styles.text}>業</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>その他の参考事項</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        被告が代金を支払わない理由など相手の言い分や、この紛争について他に参考になることを記載ください。
      </Text>
      <TextInput
        style={styles.textarea}
        placeholder="被告は、「代金はすでに支払った。」と主張して請求に応じない。"
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
        title="契約書"
        checked={existsContract}
        onPress={() => setExistsContract(!existsContract)}
      />
      <CheckBox
        title="受領証"
        checked={existsReceipt}
        onPress={() => setExistsReceipt(!existsReceipt)}
      />
      <CheckBox
        title="請求書（控）"
        checked={existsInvoice}
        onPress={() => setExistsInvoice(!existsInvoice)}
      />
      <CheckBox
        title="納品書（控）"
        checked={existsDeliveryNote}
        onPress={() => setExistsDeliveryNote(!existsDeliveryNote)}
      />
      <CheckBox
        title="登記事項証明書（商業登記簿謄本）"
        checked={existsCertificate}
        onPress={() => setExistsCertificate(!existsCertificate)}
      />
    </>
  );
};

export default TradingValue;
