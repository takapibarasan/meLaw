import 'react-native-gesture-handler';
import React, { FC, useState, useEffect } from 'react';
import EvidenceScreen from '../components/pages/EvidenceScreen';
import DocumentScreen from '../components/pages/DocumentScreen';
import PreRequestScreen from '../components/pages/PreRequestScreen';
import CaseScreen from '../components/pages/CaseScreen';
import DocumentCreateScreen from '../components/pages/DocumentCreateScreen';
import TypicalRequestScreen from '../components/pages/TypicalRequestScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export const DocumentStack = createStackNavigator();
const DocumentStackScreen: FC = () => {
  const navigation = useNavigation();
  return (
    <DocumentStack.Navigator>
      <DocumentStack.Screen name="書類" component={DocumentScreen} />
      <DocumentStack.Screen
        name="証拠の保存"
        component={EvidenceScreen}
        options={{
          headerBackTitle: '戻る',
        }}
      />
      <DocumentStack.Screen
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
      <DocumentStack.Screen
        name="返金請求をしましょう"
        component={TypicalRequestScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="賃金請求をしましょう"
        component={TypicalRequestScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="売買代金請求をしましょう"
        component={TypicalRequestScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="敷金返還請求をしましょう"
        component={TypicalRequestScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="損害賠償請求をしましょう"
        component={TypicalRequestScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="貸金返還請求をしましょう"
        component={TypicalRequestScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="内容証明郵便の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="訴状の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
    </DocumentStack.Navigator>
  );
};

export default DocumentStackScreen;
