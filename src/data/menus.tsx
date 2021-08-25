import { FC } from 'react';

export type Menu = {
  title: string;
  subtitle?: string;
  screen: string;
  variable?: string;
  number?: string;
};

export const caseData: Menu[] = [
  {
    title: 'SNSで受けた誹謗中傷に対する慰謝料請求',
    screen: '手続きを進める前に',
    variable: '誹謗中傷',
  },
  {
    title: '情報商材詐欺における返金請求',
    screen: '手続きを進める前に',
    variable: '返金請求',
  },
  {
    title: '賃金請求',
    screen: '手続きを進める前に',
    variable: '賃金請求',
  },
  {
    title: '売買代金請求',
    screen: '手続きを進める前に',
    variable: '売買代金請求',
  },
  {
    title: '敷金返還請求',
    screen: '手続きを進める前に',
    variable: '敷金返還請求',
  },
  {
    title: '損害賠償(交通事故による物損)請求',
    screen: '手続きを進める前に',
    variable: '損害賠償請求',
  },
  {
    title: '貸金返還請求',
    screen: '手続きを進める前に',
    variable: '貸金返還請求',
  },
];

export const typicalRequestData: Menu[] = [
  {
    title: '証拠の保存',
    subtitle: '証拠となる書類等を保存しましょう',
    screen: '証拠の保存',
    number: '❶',
  },
  {
    title: '内容証明郵便の作成（省略可）',
    subtitle: '',
    screen: '内容証明郵便の作成',
    number: '❷',
    variable: '内容証明郵便',
  },
  {
    title: '確認',
    subtitle: 'PDF出力して内容証明郵便を確認しましょう',
    screen: 'aa',
    number: '❸',
  },
  {
    title: '提出',
    subtitle: '請求相手に送付しましょう',
    screen: 'pass',
    number: '❹',
  },
  {
    title: '訴状の作成',
    subtitle:
      '内容証明郵便に従って返金されない場合、訴状を作成して裁判所に提出しましょう',
    screen: '訴状の作成',
    number: '❺',
    variable: '訴状',
  },
  {
    title: '確認',
    subtitle: 'PDF出力して訴状を確認しましょう',
    screen: 'aa',
    number: '❻',
  },
  {
    title: '提出',
    subtitle: '申立手数料等を準備し、少額訴訟を提訴しましょう',
    screen: 'pass',
    number: '❼',
  },
];
