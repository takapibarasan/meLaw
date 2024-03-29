import { FC } from 'react';

export type FAQ = {
  title: string;
  content: string[];
};

export const faqData: FAQ[] = [
  {
    title: 'はじめに',
    content: [
      '少額訴訟支援アプリ「meLaw」は少額訴訟や内容証明郵便など、弁護士を介さず個人でも実施できる法律上のトラブル解決方法について、書類の作成や証拠の保存をサポートします。' +
        '\n\n' +
        'フローに従って対応すれば、少額訴訟の提訴や内容証明郵便の送付などが可能ですが、本アプリの記載内容が全てではなく、個々の事情によっても対応方法は変わりますので、ご自身でも書籍やウェブサイトでお調べいただき、その中で本アプリをご利用の上、トラブルを解決いただけますと幸いです。' +
        '\n\n' +
        '本アプリが訴訟手続きをより手軽に、身近にすることで、皆さまのトラブル解決につながり、またトラブル発生の抑止力となることを願っています。',
    ],
  },
  {
    title: '少額訴訟とは',
    content: [
      '少額訴訟とは、60万円以下の金銭の支払いを求める場合に利用できる訴訟手続きです。原則１回の期日（１日）で審理が終了することから、通常の訴訟より短期間で問題解決を図ることができます。' +
        '\n\n' +
        '■少額訴訟の流れ' +
        '\n' +
        '1. 訴訟を起こした原告側が金銭の支払いを要求します。' +
        '\n' +
        '2. 訴訟を起こされた被告側がこれに対する主張を述べます。' +
        '\n' +
        '3. 証拠や証人等を調べたうえで、裁判官が判決を言い渡します。' +
        '\n' +
        '被告側に支払義務があるという判決を下された場合も、分割払いが認められたり、支払猶予期間が設けられたりすることがあります。' +
        '\n' +
        'また、通常の訴訟と同様に、訴訟の途中で和解が成立する場合もあります。',
    ],
  },
  {
    title: '少額訴訟するメリット',
    content: [
      '1. 訴訟をしなかった場合と比較し、金銭を回収できる可能性が高まる' +
        '\n' +
        '少額訴訟で判決が出たにもかかわらず、相手が支払いに応じない場合、少額訴訟債権執行という手続きにより、相手方の財産を差し押さえることができます。' +
        '\n' +
        '少額訴訟債権執行で差し押さえできる財産は、次の通りです。' +
        '\n\n' +
        ' (1) 相手方名義の預貯金' +
        '\n' +
        ' (2) 相手が雇い主から受け取る給料' +
        '\n' +
        ' (3) 所有不動産の入居者から相手が受け取る家賃収入' +
        '\n\n' +
        '一般的に、財産の差し押さえは強制執行と呼ばれます。' +
        '\n' +
        '強制執行で差し押さえできる財産は、預貯金や給料だけでなく、不動産や自動車、貴金属など多岐にわたります。' +
        '\n\n' +
        'しかし、強制執行の手続きは複雑で、手間がかかるため、' +
        '\n' +
        '少額訴訟においては、簡単に手続きができる少額訴訟債権執行という制度が設けられています。' +
        '\n\n' +
        '少額訴訟債権執行でどの財産を差し押さえるかは、基本的に申立人（支払いを請求する側）が決めることができます。' +
        '\n' +
        'ただし、相手にどのような財産があるかは、申立人が調査して突き止めなければいけません。' +
        '\n\n' +
        '2. 通常訴訟よりも手続きが簡単で、かつ時間がかからない' +
        '\n' +
        '少額訴訟の手続きは一般的な訴訟と比べて簡易的です。' +
        '\n' +
        '原則として即日判決が言い渡されますので、通常訴訟と比べると負担が少ないというメリットがあります。' +
        '\n\n' +
        '3. 通常訴訟よりも費用が安い' +
        '\n' +
        '少額訴訟は、通常訴訟と比べて申立費用が低額です。' +
        '\n' +
        'また、弁護士に依頼しなくても個人で訴訟が提起できるので弁護士費用を抑えることができます。' +
        '\n\n' +
        '本アプリでは弁護士を通さず、個人による少額訴訟の提起をサポートします。',
    ],
  },
  {
    title: `少額訴訟を利用できるケース`,
    content: [
      '1. 請求金額上限が60万円以下である' +
        '\n' +
        '少額訴訟は60万円以下の請求金額を対象としています。' +
        '\n' +
        'ただし、訴額60万円には利息や違約金は含まれていないので、利息や違約金を差し引いた請求金額が、60万円以下であれば少額訴訟の申立は可能です。' +
        '\n\n' +
        '2. 少額訴訟回数が年に10回以下である' +
        '\n' +
        '少額訴訟を同じ裁判所で利用できる回数は、年に10回までとなります。' +
        '\n' +
        '消費者金融など、多数の少額債権を所有する債権者が、少額訴訟制度を多用することを防止するために、回数制限が設けられています。' +
        '\n\n' +
        '3. 被告の住所が明確である' +
        '\n' +
        '少額訴訟は、単純な金銭債権であれば債権者(原告)の住所(店舗であれば店舗所在地)を管轄する簡易裁判所で行うことができますが、訴状は必ず債務者である被告に送達（送付）が必要です。' +
        '\n' +
        'そのため、債務者である被告の住所地が不明な場合、訴状を送達できず、少額訴訟そのものを提起できません。' +
        '\n\n' +
        '本アプリでは、基本的に被告の住所特定についてはサポートしていませんが、例外として「Twitterで受けた誹謗中傷に対する慰謝料請求」については、他の類型よりも被告が不明の場合が多いと思いますので、被告の住所特定までの道筋をサポートしています。' +
        '\n\n' +
        '4. 相手側が弁護士に依頼していない' +
        '\n' +
        '相手側が弁護士に依頼している場合、少額訴訟を提起しても、通常訴訟への移行を求められることがあります。' +
        '\n' +
        'この場合は二度手間となってしまうので、こちらも弁護士に依頼し、通常裁判を申立てた方がよいでしょう。',
    ],
  },
  {
    title: `少額訴訟支援アプリmeLawでできること`,
    content: [
      '以下の７つの類型について、それぞれのフローに沿って対応することで、少額訴訟の訴えを起こすことができます。' +
        '\n' +
        '「少額訴訟を利用できるケース」に該当する必要がありますので、ご注意ください。' +
        '\n\n' +
        '1. 貸金返還請求' +
        '\n' +
        '2. Twitterで受けた誹謗中傷に対する慰謝料請求' +
        '\n' +
        '3. 情報商材詐欺における返金請求' +
        '\n' +
        '4. 未払い賃金請求' +
        '\n' +
        '5. 未払いの売買代金請求' +
        '\n' +
        '6. 敷金返還請求' +
        '\n' +
        '7. 損害賠償(交通事故による物損)請求' +
        '\n\n' +
        '「訴状」など必要な書類については、空欄に必要事項を記載することで、書類を完成させることができ、WordやExcel形式で出力できます。' +
        '\n' +
        'WordやExcelで、より自由に記載の変更が可能です。' +
        '\n' +
        '最終的に、ご自宅のプリンターやセブンイレブンで使用できる「セブンプリント」などで、印刷してご使用ください。' +
        '\n\n' +
        'その他、必要な証拠の画像をアップロードし、保存することができます。',
    ],
  },
  {
    title: `少額訴訟支援アプリmeLawの使い方`,
    content: [
      'トップページの「新規書類作成」より訴えたい訴訟類型を選択し、フローに沿って書類作成などについて、ご対応ください。' +
        '\n' +
        '作成中及び作成の完了した書類は、トップページに一覧で表示されます。後からでも、編集やPDF出力を実施することができます。' +
        '\n\n' +
        '証拠となる画像の保存は、トップページの「証拠の保存」か、それぞれの訴訟類型のフローにおける「証拠の保存」で実施することができます。',
    ],
  },
  {
    title: '月額プランのご紹介',
    content: [
      '無料プランでは「貸金返還請求」のみ利用できますが、月額プランでは以下の６類型について、請求・訴訟フローの確認と書類作成・保存機能を利用できます。' +
        '\n\n' +
        '1. Twitterで受けた誹謗中傷に対する慰謝料請求' +
        '\n' +
        '2. 情報商材詐欺における返金請求' +
        '\n' +
        '3. 未払いの賃金請求' +
        '\n' +
        '4. 未払いの売買代金請求' +
        '\n' +
        '5. 敷金返還請求' +
        '\n' +
        '6. 交通事故による物損に基づく損害賠償請求' +
        '\n\n' +
        '「Twitterで受けた誹謗中傷に対する慰謝料請求」については、内容証明郵便・訴状の作成だけでなく、IPアドレスの開示～加害者の特定も合わせてサポートしています。' +
        '\n\n' +
        'ぜひご利用ください。',
    ],
  },
];
