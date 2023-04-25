import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import SettingsScreen from '../components/pages/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HelpScreen from '../components/pages/HelpScreen';
import BillingScreen from '../components/pages/BillingScreen';
import BillingCancelScreen from '../components/pages/BillingCancelScreen';

const SettingsStack = createStackNavigator();
const SettingsStackScreen: FC = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="ヘルプ" component={HelpScreen} />
    <SettingsStack.Screen name="よくあるご質問" component={SettingsScreen} />
    <SettingsStack.Screen
      name="月額プランに登録"
      component={BillingScreen}
      options={{
        headerBackTitle: '戻る',
      }}
    />
    <SettingsStack.Screen
      name="プラン解約"
      component={BillingCancelScreen}
      options={{
        headerBackTitle: '戻る',
      }}
    />
  </SettingsStack.Navigator>
);

export default SettingsStackScreen;
