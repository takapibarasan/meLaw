import React, { FC, useState } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TextInput, Text } from 'react-native';
import { styles } from '../../styles/form';
import firebase from 'firebase/app';
import 'firebase/firestore';

type Props = {
  date: firebase.firestore.Timestamp | null;
  setDate: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | null>
  >;
  start?: boolean;
  end?: boolean;
};
const DateTemplate: FC<Props> = ({ date, setDate, start, end }) => {
  const [isShownDatePicker, setIsShownDatePicker] = useState<boolean>(false);
  return (
    <>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <TextInput
          value={
            date === null || date === undefined
              ? ''
              : new Date(date.seconds * 1000).getFullYear() +
                '/' +
                (new Date(date.seconds * 1000).getMonth() + 1) +
                '/' +
                new Date(date.seconds * 1000).getDate()
          }
          style={styles.numberInputWide}
        />
        <Button
          buttonStyle={{ backgroundColor: 'white', marginTop: 2 }}
          onPress={() => {
            setIsShownDatePicker(!isShownDatePicker);
          }}
          icon={<Icon name="calendar" size={16} />}
        />
        {start ? <Text style={styles.inputLabel}>から</Text> : null}
        {end ? <Text style={styles.inputLabel}>まで</Text> : null}
      </View>
      {isShownDatePicker ? (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={
            date === null || date === undefined
              ? new Date()
              : new Date(date.seconds * 1000)
          }
          onChange={(event: Event, selectedDate?: Date) => {
            if (selectedDate !== undefined)
              setDate(firebase.firestore.Timestamp.fromDate(selectedDate));
            setIsShownDatePicker(!isShownDatePicker);
          }}
          locale="ja-JP"
        />
      ) : null}
    </>
  );
};

export default DateTemplate;
