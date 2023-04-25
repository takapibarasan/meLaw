import React, { FC, useState } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TextInput, Text } from 'react-native';
import { styles } from '../../styles/form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';

type Props = {
  posts: {
    url: string;
    accountId: string;
    postedDate: firebase.firestore.Timestamp | null;
    postedHour: string;
    postedMinute: string;
    infringementType: number;
    identifiabilityType: number;
    post: string;
    updatedAt: firebase.firestore.Timestamp | null;
    createdAt: firebase.firestore.Timestamp | null;
  }[];
  setPosts: React.Dispatch<
    React.SetStateAction<
      {
        url: string;
        accountId: string;
        postedDate: firebase.firestore.Timestamp | null;
        postedHour: string;
        postedMinute: string;
        infringementType: number;
        identifiabilityType: number;
        post: string;
        updatedAt: firebase.firestore.Timestamp | null;
        createdAt: firebase.firestore.Timestamp | null;
      }[]
    >
  >;
  index: number;
};
const DateTemplate: FC<Props> = ({ posts, setPosts, index }) => {
  const [isShownDatePicker, setIsShownDatePicker] = useState<boolean>(false);
  const date = posts[index].postedDate;
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
            if (selectedDate !== undefined) {
              const newPosts = _.cloneDeep(posts);
              newPosts[index].postedDate =
                firebase.firestore.Timestamp.fromDate(selectedDate);
              setPosts(newPosts);
            }
            setIsShownDatePicker(!isShownDatePicker);
          }}
          locale="ja-JP"
        />
      ) : null}
    </>
  );
};

export default DateTemplate;
