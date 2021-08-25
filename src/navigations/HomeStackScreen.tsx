import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import HomeScreen from '../components/pages/HomeScreen';
import EvidenceScreen from '../components/pages/EvidenceScreen';
import PreRequestScreen from '../components/pages/PreRequestScreen';
import CaseScreen from '../components/pages/CaseScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { DocumentStack } from './DocumentStackScreen';


const HomeStack = createStackNavigator();
const HomeStackScreen: FC = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="ホーム" component={HomeScreen} />
    <HomeStack.Screen
      name="証拠の保存"
      component={EvidenceScreen}
      options={{
        headerBackTitle: '戻る',
      }}
    />
    <HomeStack.Screen
      name="書類作成"
      component={CaseScreen}
      options={{
        headerBackTitle: '戻る',
      }}
    />
    <DocumentStack.Screen
      name="手続きを進める前に"
      component={PreRequestScreen}
      options={{
        headerBackTitle: '戻る',
      }}
      initialParams={{ type: '' }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
