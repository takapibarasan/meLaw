import 'react-native-gesture-handler';
import React, { FC } from 'react';
import EvidenceScreen from '../components/pages/EvidenceScreen';
import EvidenceDetailScreen from '../components/pages/EvidenceDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const EvidenceStack = createStackNavigator();
const EvidenceStackScreen: FC = () => (
  <EvidenceStack.Navigator>
    <EvidenceStack.Screen
      name="証拠"
      options={{
        headerBackTitle: '戻る',
      }}
      component={EvidenceScreen}
    />
    <EvidenceStack.Screen
      name="証拠詳細"
      options={{
        headerBackTitle: '戻る',
      }}
      component={EvidenceDetailScreen}
    />
  </EvidenceStack.Navigator>
);

export default EvidenceStackScreen;
