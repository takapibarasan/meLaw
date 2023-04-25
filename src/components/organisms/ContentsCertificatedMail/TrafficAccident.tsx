import React, { FC } from 'react';
import { Text } from 'react-native-elements';
import { View, TextInput } from 'react-native';
import Time from '../../molecules/Time';
import { styles } from '../../../styles/form';
import DateTemplate from '../../molecules/Date';
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
}) => {
  return (
    <>
      <Text style={styles.description}>
        交通事故に関する情報を入力しましょう
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>交通事故発生日時</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <DateTemplate date={accidentDate} setDate={setAccidentDate} />
      <Time
        hour={accidentHour}
        minute={accidentMinute}
        setHour={setAccidentHour}
        setMinute={setAccidentMinute}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故発生場所</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="◯◯県◯◯市◯◯町◯◯丁目◯番先路上"
        onChangeText={(value) => setAccidentLocation(value)}
        value={accidentLocation}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>あなた（通告人）の車両の種類</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="普通乗用自動車"
        onChangeText={(value) => setVehicleType(value)}
        value={vehicleType}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>相手方（被通告人）の車両の種類</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="普通乗用自動車"
        onChangeText={(value) => setOppositeVehicleType(value)}
        value={oppositeVehicleType}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>事故の原因</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <TextInput
        style={styles.textInputWide}
        placeholder="貴殿の不注意、貴殿の脇見運転"
        onChangeText={(value) => setAccidentReason(value)}
        value={accidentReason}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.label}>損害</Text>
        <Text style={styles.required}>必須</Text>
      </View>
      <Text style={styles.inputDescription}>
        被害を受けた損害の種類に、請求金額を記載ください。
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>修理費</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setRepairCost(value)}
          value={repairCost}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>格落ち損(評価損)</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setValuationLoss(value)}
          value={valuationLoss}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>代車料</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setRentalCost(value)}
          value={rentalCost}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>買替差額</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setReplacementCost(value)}
          value={replacementCost}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>登録手続関係費</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setRegistrationExpenses(value)}
          value={registrationExpenses}
        />
        <Text style={styles.text}>円</Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
        <Text style={styles.subtitle}>休車損害</Text>
        <TextInput
          style={styles.numberInputWide}
          keyboardType="numeric"
          onChangeText={(value) => setSuspensionLoss(value)}
          value={suspensionLoss}
        />
        <Text style={styles.text}>円</Text>
      </View>
    </>
  );
};

export default TrafficAccident;
