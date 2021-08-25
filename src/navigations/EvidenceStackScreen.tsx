import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import EvidenceScreen from '../components/pages/EvidenceScreen';
import { createStackNavigator } from '@react-navigation/stack';

const EvidenceStack = createStackNavigator();
const EvidenceStackScreen: FC = () => (
  <EvidenceStack.Navigator>
    <EvidenceStack.Screen name="証拠" component={EvidenceScreen} />
  </EvidenceStack.Navigator>
);

export default EvidenceStackScreen