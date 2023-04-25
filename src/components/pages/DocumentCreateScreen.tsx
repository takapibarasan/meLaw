import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Complaint from './Complaint';
import ContentsCertificatedMail from './ContentsCertificatedMail';
import Injunction from './SNS/Injunction';
import Disclosure from './SNS/Disclosure';
import Letter from './SNS/Letter';
import UnsecuredRequestLetter from './SNS/UnsecuredRequestLetter';
import AccessLogPreservationRequest from './SNS/AccessLogPreservationRequest';

type RootStackParamList = {
  Home: undefined;
  Profile: { constant: string; variable: string; id: string };
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
  const { constant, variable, id } = route.params;
  return (
    <>
      {variable == '内容証明郵便' ? (
        <ContentsCertificatedMail type={constant} caseId={id} />
      ) : (
        <></>
      )}
      {variable == '訴状' ? <Complaint type={constant} caseId={id} /> : <></>}
      {variable == '仮処分命令申立書' ? (
        <Injunction type={constant} caseId={id} />
      ) : (
        <></>
      )}
      {variable == '上申書' ? <Letter type={constant} caseId={id} /> : <></>}
      {variable == '無担保上申書' ? (
        <UnsecuredRequestLetter type={constant} caseId={id} />
      ) : (
        <></>
      )}
      {variable == 'アクセスログ保存要請書' ? (
        <AccessLogPreservationRequest type={constant} caseId={id} />
      ) : (
        <></>
      )}
      {variable == '発信者情報開示請求書' ? (
        <Disclosure type={constant} caseId={id} />
      ) : (
        <></>
      )}
    </>
  );
};

export default DocumentCreateScreen;
