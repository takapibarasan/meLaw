import ButtonList from '../organisms/ButtonList';
import { snsFlowData, flowData } from '../../data/menus';
import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { type: string; caseId: string };
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

const FlowScreen: FC<Props> = ({ route, navigation }: Props) => {
  let { type, caseId } = route.params;
  if (caseId === undefined) caseId = Math.random().toString(36).slice(-8);

  return type == '誹謗中傷' ? (
    <ButtonList buttons={snsFlowData} constant={type} id={caseId} />
  ) : (
    <ButtonList buttons={flowData} constant={type} id={caseId} />
  );
};

export default FlowScreen;
