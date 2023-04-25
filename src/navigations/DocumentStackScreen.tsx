import 'react-native-gesture-handler';
import React, { FC } from 'react';
import EvidenceScreen from '../components/pages/EvidenceScreen';
import DocumentScreen from '../components/pages/DocumentScreen';
import PreRequestScreen from '../components/pages/PreRequestScreen';
import CaseScreen from '../components/pages/CaseScreen';
import DocumentCreateScreen from '../components/pages/DocumentCreateScreen';
import DocumentConfirmScreen from '../components/pages/DocumentConfirmScreen';
import OtherDocumentsScreen from '../components/pages/OtherDocumentsScreen';
import BillingScreen from '../components/pages/BillingScreen';
import FlowScreen from '../components/pages/FlowScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { subtract } from 'lodash';
import SubmitScreen from '../components/pages/SubmitScreen';

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
        name="慰謝料請求をしましょう"
        component={FlowScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="返金請求をしましょう"
        component={FlowScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="給料請求をしましょう"
        component={FlowScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="売買代金請求をしましょう"
        component={FlowScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="敷金返還請求をしましょう"
        component={FlowScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="損害賠償（交通事故による物損）請求をしましょう"
        component={FlowScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ type: '' }}
      />
      <DocumentStack.Screen
        name="貸金返還請求をしましょう"
        component={FlowScreen}
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
        name="少額訴訟　訴状の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="仮処分命令申立書の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="上申書の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="無担保上申書の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="アクセスログ保存要請書の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="発信者情報開示請求書の作成"
        component={DocumentCreateScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="内容証明郵便の確認"
        component={DocumentConfirmScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="訴状の確認"
        component={DocumentConfirmScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="仮処分命令申立書の確認"
        component={DocumentConfirmScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="上申書の確認"
        component={DocumentConfirmScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="無担保上申書の確認"
        component={DocumentConfirmScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="アクセスログ保存要請書の確認"
        component={DocumentConfirmScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="発信者情報開示請求書の確認"
        component={DocumentConfirmScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="その他書類の準備（仮処分命令）"
        component={OtherDocumentsScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="その他書類の準備（発信者情報開示請求）"
        component={OtherDocumentsScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
      <DocumentStack.Screen
        name="月額プランに登録"
        component={BillingScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ isSubscripton: false, setIsSubscripton: null }}
      />
      <DocumentStack.Screen
        name="書類提出"
        component={SubmitScreen}
        options={{
          headerBackTitle: '戻る',
        }}
        initialParams={{ format: '', type: '' }}
      />
    </DocumentStack.Navigator>
  );
};

export default DocumentStackScreen;
