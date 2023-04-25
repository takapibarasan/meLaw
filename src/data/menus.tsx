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
    title: '貸金返還請求',
    screen: '手続きを進める前に',
    variable: '貸金返還請求',
  },
  {
    title: 'Twitterで受けた誹謗中傷に対する慰謝料請求',
    screen: '手続きを進める前に',
    variable: '誹謗中傷',
  },
  {
    title: '情報商材詐欺における返金請求',
    screen: '手続きを進める前に',
    variable: '返金請求',
  },
  {
    title: '未払いの給料請求',
    screen: '手続きを進める前に',
    variable: '給料請求',
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
];

export const flowData: Menu[] = [
  {
    title: '証拠の保存',
    subtitle: '証拠として使用する画像を保存しましょう',
    screen: '証拠の保存',
    number: '1',
  },
  {
    title: '内容証明郵便の作成・編集',
    subtitle: '',
    screen: '内容証明郵便の作成',
    number: '2',
    variable: '内容証明郵便',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Word・PDF出力して内容証明郵便を確認しましょう',
    screen: '内容証明郵便の確認',
    number: '3',
    variable: '内容証明郵便',
  },
  {
    title: '書類提出',
    subtitle: '請求相手に送付しましょう',
    screen: '書類提出',
    number: '4',
    variable: '内容証明郵便',
  },
  {
    title: '少額訴訟　訴状の作成・編集',
    subtitle:
      '内容証明郵便に従って返金されない場合、訴状を作成して裁判所に提出しましょう',
    screen: '少額訴訟　訴状の作成',
    number: '5',
    variable: '訴状',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Excel出力して訴状を確認しましょう（PDF対応予定）',
    screen: '訴状の確認',
    number: '6',
    variable: '訴状',
  },
  {
    title: '書類提出',
    subtitle: '申立手数料等を準備し、少額訴訟を提訴しましょう',
    screen: '書類提出',
    number: '7',
    variable: '訴状',
  },
];

export const snsFlowData: Menu[] = [
  {
    title: '証拠の保存',
    subtitle: '証拠として使用する画像を保存しましょう',
    screen: '証拠の保存',
    number: '1',
  },
  {
    title: '仮処分命令の申立てに必要な書類の作成',
    subtitle:
      '仮処分申立書＋別紙目録、管轄上申書、証拠説明書、証拠添付内の陳述書を作成しましょう',
    screen: '仮処分命令申立書の作成',
    number: '2',
    variable: '仮処分命令申立書',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Word・PDF出力して、作成した書類を確認しましょう',
    screen: '仮処分命令申立書の確認',
    number: '3',
    variable: '仮処分命令申立書',
  },
  {
    title: 'その他書類の準備',
    subtitle:
      'Twitter社の資格証明書と翻訳文、「Whois検索結果」「本件投稿記事」を印刷して準備します',
    screen: 'その他書類の準備（仮処分命令）',
    number: '4',
    variable: 'その他書類の準備（仮処分命令）',
  },
  {
    title: '仮処分命令の申立てに必要な書類の提出',
    subtitle:
      '手順2〜4で準備した書類一式を裁判所に提出し、仮処分命令の申立てを実施します',
    screen: '書類提出',
    number: '5',
    variable: '仮処分命令申立書',
  },
  {
    title: '債権者面接の実施',
    subtitle: '債権者が裁判所に出頭して、裁判官と訴訟内容について面談します',
    screen: '',
    number: '6',
  },
  {
    title: 'Twitter社代理人との日程調整',
    subtitle:
      '代理人（弁護士）に対して、手順2〜4の書類一式をメールまたはFAXで送付の上、双方審尋期日の候補日を調整します',
    screen: '',
    number: '7',
  },
  {
    title: '上申書の作成・編集',
    subtitle: '裁判所に対し、審尋候補日の連絡をしましょう',
    screen: '上申書の作成',
    number: '8',
    variable: '上申書',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Word・PDF出力して上申書を確認しましょう',
    screen: '上申書の確認',
    number: '9',
    variable: '上申書',
  },
  {
    title: '書類提出',
    subtitle: '裁判所に提出しましょう',
    screen: '書類提出',
    number: '10',
    variable: '上申書',
  },
  {
    title: '審尋',
    subtitle: '裁判官との面談',
    screen: '',
    number: '11',
  },
  {
    title: '無担保上申書の作成・編集',
    subtitle: '仮処分命令の発令前に、裁判所に無担保上申書を提出しましょう',
    screen: '無担保上申書の作成',
    number: '12',
    variable: '無担保上申書',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Word・PDF出力して無担保上申書を確認しましょう',
    screen: '無担保上申書の確認',
    number: '13',
    variable: '無担保上申書',
  },
  {
    title: '書類提出',
    subtitle:
      '無担保上申書と、手順2で作成した別紙目録（当事者目録、発信者情報目録、対象アカウント目録）を裁判所に提出しましょう',
    screen: '書類提出',
    number: '14',
    variable: '無担保上申書',
  },
  {
    title: '仮処分命令の発令',
    subtitle: 'IPアドレス等の情報がサイト運営者から開示されます',
    screen: '',
    number: '15',
  },
  {
    title: 'IPアドレス開示',
    subtitle:
      '仮処分命令発令後、1週間以内にTwitter社からIPアドレスの開示に関するメールが届きます',
    screen: '',
    number: '16',
  },
  {
    title: 'プロバイダを特定',
    subtitle: 'WhoisでIPアドレスを検索し、プロバイダを特定しましょう',
    screen: '',
    number: '17',
  },
  {
    title: 'アクセスログ保存要請書の作成・編集',
    subtitle: 'プロバイダに対し書面でアクセスログの保存要請をしましょう',
    screen: 'アクセスログ保存要請書の作成',
    number: '18',
    variable: 'アクセスログ保存要請書',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Word・PDF出力してアクセスログ保存要請書を確認しましょう',
    screen: 'アクセスログ保存要請書の確認',
    number: '19',
    variable: 'アクセスログ保存要請書',
  },
  {
    title: '書類提出',
    subtitle:
      'プロバイダに提出後、プロバイダから約1週間後にログ保存完了通知書が届きます',
    screen: '書類提出',
    number: '20',
    variable: 'アクセスログ保存要請書',
  },
  {
    title: '発信者情報開示請求書の作成・編集',
    subtitle: 'プロバイダに発信者情報開示請求をしましょう',
    screen: '発信者情報開示請求書の作成',
    number: '21',
    variable: '発信者情報開示請求書',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Word・出力して発信者情報開示請求書を確認しましょう',
    screen: '発信者情報開示請求書の確認',
    number: '22',
    variable: '発信者情報開示請求書',
  },
  {
    title: 'その他書類の準備',
    subtitle:
      '公的書類の写し、印鑑証明書、「本件投稿記事」、Twitter社から届いたIPアドレスに関するメールを印刷して準備します',
    screen: 'その他書類の準備（発信者情報開示請求）',
    number: '23',
    variable: 'その他書類の準備（発信者情報開示請求）',
  },
  {
    title: '書類提出',
    subtitle: '手順21〜23で準備した書類一式をプロバイダに提出しましょう',
    screen: '書類提出',
    number: '24',
    variable: '発信者情報開示請求書',
  },
  {
    title: 'プロバイダによる発信者情報の開示',
    subtitle:
      'プロバイダから発信者の情報（氏名、住所、電話番号、メールアドレス）が開示されます',
    screen: '',
    number: '25',
  },
  {
    title: '内容証明郵便の作成・編集',
    subtitle: '',
    screen: '内容証明郵便の作成',
    number: '26',
    variable: '内容証明郵便',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Word・PDF出力して内容証明郵便を確認しましょう',
    screen: '内容証明郵便の確認',
    number: '27',
    variable: '内容証明郵便',
  },
  {
    title: '書類提出',
    subtitle: '請求相手に送付しましょう',
    screen: '書類提出',
    number: '28',
    variable: '内容証明郵便',
  },
  {
    title: '少額訴訟　訴状の作成・編集',
    subtitle:
      '内容証明郵便に従って慰謝料が支払われない場合、訴状を作成して裁判所に提出しましょう',
    screen: '少額訴訟　訴状の作成',
    number: '29',
    variable: '訴状',
  },
  {
    title: '入力内容の確認・書類の出力',
    subtitle: 'Excel出力して訴状を確認しましょう（PDF対応予定）',
    screen: '訴状の確認',
    number: '30',
    variable: '訴状',
  },
  {
    title: '書類提出',
    subtitle: '申立手数料等を準備し、少額訴訟を提訴しましょう',
    screen: '書類提出',
    number: '31',
    variable: '訴状',
  },
];
