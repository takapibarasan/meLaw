import React, { FC } from 'react';
import ButtonList from '../organisms/ButtonList';
import { caseData } from '../../data/menus';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { type: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
};

const CaseScreen: FC<Props> = () => {
  return <ButtonList buttons={caseData} existsSubtitle={false} constant={''} />;
};

export default CaseScreen;
