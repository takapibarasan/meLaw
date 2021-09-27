import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Complaint from './Complaint';
import ContentsCertificatedMail from './ContentsCertificatedMail';
import Injunction from './Injunction';

type RootStackParamList = {
  Home: undefined;
  Profile: { constant: string; variable: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const DocumentCreateScreen = ({ route, navigation }: Props) => {
  const { constant, variable } = route.params;
  return (
    <>
      {variable == '内容証明郵便' ? (
        <ContentsCertificatedMail type={constant} />
      ) : (
        <></>
      )}
      {variable == '訴状' ? <Complaint type={constant} /> : <></>}
      {variable == '仮処分命令申立書' ? <Injunction type={constant} /> : <></>}
    </>
  );
};

export default DocumentCreateScreen;
