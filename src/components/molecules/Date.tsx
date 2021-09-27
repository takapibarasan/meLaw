import React, { FC, useState } from 'react';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  date: Date;
};
const Date: FC<Props> = ({ date }) => {
  const [isShownDatePicker, setIsShownDatePicker] = useState<boolean>(false);
  return (
    <>
      <Text>{String(date)}</Text>
      <Button
        onPress={() => {
          setIsShownDatePicker(!isShownDatePicker);
        }}
        icon={<Icon name="calendar" size={16} />}
      />
      {isShownDatePicker ? (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={(event: Event, selectedDate) => {
            date = selectedDate;
            setIsShownDatePicker(!isShownDatePicker);
          }}
        />
      ) : null}
    </>
  );
};

export default Date;
