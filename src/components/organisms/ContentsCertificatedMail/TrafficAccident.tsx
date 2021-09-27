import React, { FC } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Time from '../../molecules/Time';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
import { ContentsCertifiedMailTrafficAccident } from '../../../models/contents-certified-mail';

type Props = {
  model: ContentsCertifiedMailTrafficAccident;
};
const TrafficAccident: FC<Props> = ({ model }) => {
  return (
    <>
      <Text style={styles.description}>
        交通事故に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>交通事故発生日時</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={model.accidentDate} />
      <Time />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故発生場所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="◯◯県◯◯市◯◯町◯◯丁目◯番先路上"
        value={model.accidentLocation}
        onChangeText={(value) => {
          model.accidentLocation = value;
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>あなた（通告人）の車両の種類</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="普通常用自動車"
        value={model.vehicleType}
        onChangeText={(value) => {
          model.vehicleType = value;
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>相手方（被通告人）の車両の種類</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="普通常用自動車"
        value={model.oppositeVehicleType}
        onChangeText={(value) => {
          model.oppositeVehicleType = value;
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故の原因</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="貴殿の不注意、貴殿の脇見運転"
        value={model.accidentReason}
        onChangeText={(value) => {
          model.accidentReason = value;
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>損害</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>修理費</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.repairCost}
          onChangeText={(value) => {
            model.repairCost = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>格落ち損(評価損)</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.valuationLoss}
          onChangeText={(value) => {
            model.valuationLoss = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>代車料</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.rentalCost}
          onChangeText={(value) => {
            model.rentalCost = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>買替差額</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.replacementCost}
          onChangeText={(value) => {
            model.replacementCost = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>登録手続関係費</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.registrationExpenses}
          onChangeText={(value) => {
            model.registrationExpenses = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>休車損害</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          value={model.suspensionLoss}
          onChangeText={(value) => {
            model.suspensionLoss = value;
          }}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default TrafficAccident;
