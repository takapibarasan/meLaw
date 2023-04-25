import React, { FC, useState } from 'react';
import { CheckBox, Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
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
  setLoanAmount,
  setLoanDate,
  setExistsReturnDate,
  setReturnDate,
  setInterest,
  setExistsDelayPayment,
  setDelayPayment,
  setReturnAmount,
}) => {
  return (
    <>
      <Text style={styles.description}>貸付金に関する情報を入力しましょう</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>貸付金額</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setLoanAmount(value)}
          value={loanAmount}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>貸し付けた日付</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={loanDate} setDate={setLoanDate} />
      <CheckBox
        containerStyle={{ marginTop: 40 }}
        checked={existsReturnDate}
        title="返還時期の定めの有無"
        onPress={() => setExistsReturnDate(!existsReturnDate)}
      />
      <Text style={styles.inputDescription}>
        返還時期を事前に約束していない場合は空欄にしてください。
      </Text>

      {existsReturnDate ? (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>
              返還時期（貸付金の返還を約束した日付）
            </Text>
            <Text style={styles.required}>必須</Text>
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.label}>返還を申し入れた日付</Text>
            <Text style={styles.optional}>任意</Text>
          </View>
        </>
      )}
      <DateTemplate date={returnDate} setDate={setReturnDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利率</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        貸付日〜返還時期に発生する利息の割合です。事前に取り決めていない場合は空欄にしてください。
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>年</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={(value) => setInterest(value)}
          value={interest}
        />
        <Text style={styles.text}>%</Text>
      </View>
      <CheckBox
        containerStyle={{ marginTop: 40 }}
        checked={existsDelayPayment}
        title="遅延損害金の請求有無"
        onPress={() => setExistsDelayPayment(!existsDelayPayment)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害利率</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        返還時期以降、貸付金の返済を滞納した場合に生じる損害賠償金の利率です。
        事前に取り決めていない場合は空欄にしてください。
        なお、2020年の民法改正で法廷利率は年3%となりましたので、取り決めがない場合は年3%となります。
        (3年ごとに変更の可能性がありますので、ご注意ください)
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>年</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          onChangeText={(value) => setDelayPayment(value)}
          value={delayPayment}
        />
        <Text style={styles.text}>%</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>一部返済済の金額</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <Text style={styles.inputDescription}>
        返済済みの金額がない（全額貸し付けたままである）場合は空欄としてください。
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setReturnAmount(value)}
          value={returnAmount}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default LendMoney;
