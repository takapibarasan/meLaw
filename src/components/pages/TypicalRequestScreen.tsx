import ButtonList from '../organisms/ButtonList';
import { typicalRequestData } from '../../data/menus';
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

const TypicalRequestScreen: FC<Props> = ({ route, navigation }: Props) => {
  const { type } = route.params;
  return (
    <ButtonList
      buttons={typicalRequestData}
      existsSubtitle={true}
      constant={type}
    />
  );
};

export default TypicalRequestScreen;
