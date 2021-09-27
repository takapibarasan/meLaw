import ButtonList from '../organisms/ButtonList';
import { snsFlowData, flowData } from '../../data/menus';
import React, { FC } from 'react';
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
  navigation: ProfileScreenNavigationProp;
};

const FlowScreen: FC<Props> = ({ route, navigation }: Props) => {
  const { type } = route.params;
  console.log(type);
  return type == '誹謗中傷' ? (
    <ButtonList buttons={snsFlowData} existsSubtitle={true} constant={type} />
  ) : (
    <ButtonList buttons={flowData} existsSubtitle={true} constant={type} />
  );
};

export default FlowScreen;
