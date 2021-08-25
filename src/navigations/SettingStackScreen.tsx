import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import SettingsScreen from '../components/pages/SettingsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const SettingsStack = createStackNavigator();
const SettingsStackScreen: FC = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="設定" component={SettingsScreen} />
  </SettingsStack.Navigator>
);

export default SettingsStackScreen;