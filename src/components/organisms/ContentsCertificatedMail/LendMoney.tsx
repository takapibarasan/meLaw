import React, { FC } from 'react';
import { CheckBox, Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import { ContentsCertifiedMailLendMoney } from '../../../models/contents-certified-mail';

type Props = {
  model: ContentsCertifiedMailLendMoney;
};
const LendMoney: FC<Props> = ({ model }) => {
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
          value={model.loanAmount}
          onChangeText={(value) => {
            model.loanAmount = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>貸し付けた日付</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={model.loanDate} />
      <CheckBox
        checked={model.existsReturnDate}
        title="返還時期の定めの有無"
        onPress={() => {
          model.existsReturnDate = !model.existsReturnDate;
        }}
      />
      {model.existsReturnDate ? (
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
      <DateTemplate date={model.returnDate} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>利率</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>年</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          value={model.interest}
          onChangeText={(value) => {
            model.interest = value;
          }}
        />
        <Text style={styles.text}>%</Text>
      </View>
      <CheckBox
        checked={model.existsDelayPayment}
        title="遅延損害金の請求有無"
        onPress={() => {
          model.existsDelayPayment = !model.existsDelayPayment;
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>遅延損害利率</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Text style={styles.text}>年</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="numeric"
          value={model.delayPayment}
          onChangeText={(value) => {
            model.delayPayment = value;
          }}
        />
        <Text style={styles.text}>%</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>支払済の金額</Text>
        <Text style={styles.optional}>任意</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.returnAmount}
          onChangeText={(value) => {
            model.returnAmount = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default LendMoney;
