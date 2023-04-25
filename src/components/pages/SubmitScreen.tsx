import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, StyleSheet, Linking, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    width: '100%',
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#202f55',
    marginBottom: 5,
  },
  number: {
    fontSize: 18,
  },
});

type RootStackParamList = {
  Home: undefined;
  Profile: { constant: string; variable: string; id: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const SubmitScreen = ({ route, navigation }: Props) => {
  const { constant, variable, id } = route.params;
  console.log(constant);
  console.log(variable);
  return (
    <ScrollView style={styles.wrapper}>
      {variable == '内容証明郵便' ? (
        <>
          <Text style={styles.title}>1. 内容証明郵便とは</Text>
          <Text style={styles.text}>
            内容証明郵便とは「いつ」「誰が誰に」「どういう内容の」郵便を送ったかを、日本郵便が証明する郵便です。
            {'\n'}
            法的な効力はありませんが、間違いなく、この内容で送付したということを第三者の日本郵便が証明してくれるため、相手方は「届いていない」等の言い逃れをすることができず、確実に記載した内容を通知することができます。
            {'\n'}
            内容証明郵便は郵便局にて５年間保存してもらえます。{'\n\n'}
            詳細は以下の日本郵便ウェブサイトをご参照ください。
          </Text>
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://www.post.japanpost.jp/service/fuka_service/syomei/',
              ).catch((err) => console.error('URLを開けませんでした。', err))
            }
          >
            https://www.post.japanpost.jp/service/fuka_service/syomei/
          </Text>
          {constant === '貸金返還請求' ? (
            <>
              <Text style={styles.title}>
                2. 貸金返還請求における内容証明郵便の活用方法
              </Text>
              <Text style={styles.text}>
                内容証明郵便により、金銭を貸し付けた条件を通知し、返金を求める旨を相手方に求めます。
              </Text>
            </>
          ) : (
            <></>
          )}
          {constant === '返金請求' ? (
            <>
              <Text style={styles.title}>
                2. 情報商材詐欺における返金請求についての内容証明郵便の活用方法
              </Text>
              <Text style={styles.text}>
                内容証明郵便により、クーリングオフ制度に基づき、契約を解除し、購入金額の返金を求める旨を伝えます。
              </Text>
            </>
          ) : (
            <></>
          )}
          {constant === '給料請求' ? (
            <>
              <Text style={styles.title}>
                2. 未払い賃金請求における内容証明郵便の活用方法
              </Text>
              <Text style={styles.text}>
                内容証明郵便により、未払いの賃金について、支払いを求める旨を伝えます。
              </Text>
            </>
          ) : (
            <></>
          )}
          {constant === '売買代金請求' ? (
            <>
              <Text style={styles.title}>
                2. 未払いの売買代金請求における内容証明郵便の活用方法
              </Text>
              <Text style={styles.text}>
                内容証明郵便により、未払いの売買代金について、支払いを求める旨を伝えます。
              </Text>
            </>
          ) : (
            <></>
          )}
          {constant === '敷金返還請求' ? (
            <>
              <Text style={styles.title}>
                2. 敷金返還請求における内容証明郵便の活用方法
              </Text>
              <Text style={styles.text}>
                内容証明郵便により、返還されない敷金について、支払いを求める旨を伝えます。
              </Text>
            </>
          ) : (
            <></>
          )}
          {constant === '損害賠償請求' ? (
            <>
              <Text style={styles.title}>
                2.
                損害賠償(交通事故による物損)請求における内容証明郵便の活用方法
              </Text>
              <Text style={styles.text}>
                内容証明郵便により、事故の状況と相手方が原因で事故を起きた旨を伝え、
                {'\n'}
                ご自身が被った損害について、支払いを求める旨を伝えます。
              </Text>
            </>
          ) : (
            <></>
          )}
          {constant === '誹謗中傷' ? (
            <>
              <Text style={styles.title}>
                2.
                Twitterで受けた誹謗中傷に対する慰謝料請求における内容証明郵便の活用方法
              </Text>
              <Text style={styles.text}>
                内容証明郵便により、慰謝料の請求を求める旨を伝えます。
              </Text>
            </>
          ) : (
            <></>
          )}
          <Text style={styles.text}>
            その上で、決めた期日までに返金されない場合は、法的手段をとることを伝えます。
            {'\n\n'}
            期日までに返金されれば、問題は解決ですが、{'\n'}
            期日までに返金が無い場合は、本アプリで次の手順として紹介しています、少額訴訟の提訴を検討します。
          </Text>
          <Text style={styles.title}>3. 内容証明郵便の送付方法</Text>
          <Text style={styles.text}>
            日本郵便指定の郵便局に、以下の(1)~(4)を持参すれば、送付することができます。
            {'\n'}
            対応していない郵便局もありますので、あらかじめ差し出そうとする郵便局へ送付の可否を確認ください。
            {'\n\n'}
            (1) 内容証明郵便の手紙文３通{'\n'}
            本アプリで作成できる内容証明郵便の本文です。{'\n'}
            本アプリの次の手順にて、必要事項を記入すれば作成できます。{'\n\n'}
            作成後、PDF出力できますので、ご自宅のプリンターやセブンイレブンのネットプリントにて３部印刷ください。
            {'\n'}
            １通は相手方への送付用、１通は自分の保管用、１通は郵便局での保管用となります。
            {'\n'}
            ３部それぞれの通告人（自分自身）の名前の右横に捺印しましょう。
            {'\n\n'}
            (2) 封筒（相手方への送付用）{'\n'}
            通常の郵便と同様に、封筒の表面には相手方の住所氏名を記載します。手紙文へ記載した相手方氏名と同一の氏名を書きます。
            {'\n'}
            裏面にはご自身（差出人）の住所氏名を書きます。{'\n'}
            内容証明郵便の手紙文は郵便局にてチェックが入るので、封筒は封をしないで持参します。
            {'\n\n'}
            (3) 郵便料金 {'\n'}
            以下の費用が掛かりますので、ご用意ください。{'\n'}
            料金は変更されることがありますので、詳細は郵便局にてご確認ください。
            {'\n\n'}
            〇必須の支払費用{'\n'}
            ・内容証明料 440円（2枚以上になる場合は1枚ごとに+260円）{'\n'}
            本アプリのフォーマット通りに作成される場合は、全部で2枚ですので700円となります。
            {'\n\n'}
            ・通常の郵便料金 84円（定形郵便物25g以内）{'\n\n'}
            ・一般書留郵便料 435円{'\n\n'}
            〇追加が推奨されるオプションの費用{'\n'}
            配達証明 320円{'\n'}
            配達後、郵便局が配達証明書を送ってくれますので、無事相手方に配達されたことを確認することができます。
            {'\n\n'}
            本人限定受取 105円{'\n'}
            送付した内容証明郵便を、同居する家族等ではなく、相手方本人へ確実に届けることができます。
            {'\n\n'}
            (4) 印鑑（手紙文での署名・押印で使用したもの）{'\n'}
            訂正が必要な場合に使用しますので、念のため持参しましょう。
          </Text>
          <Text style={styles.title}>4. 内容証明郵便　本文の書式規定</Text>
          <Text style={styles.text}>
            字数・行数の制限など、決まった規則に沿って書類作成する必要があります。
            {'\n'}
            本アプリで作成すれば、自動的に規則に沿った書類を出力できます。{'\n'}
            詳細は、以下の日本郵便ウェブサイトをご参照ください。
          </Text>
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://www.post.japanpost.jp/service/fuka_service/syomei/use.html',
              ).catch((err) => console.error('URLを開けませんでした。', err))
            }
          >
            https://www.post.japanpost.jp/service/fuka_service/syomei/use.html
          </Text>
          <Text style={styles.title}>5. 電子内容証明サービスについて</Text>
          <Text style={styles.text}>
            郵便局ではなく、24時間インターネットで差出し可能な電子内容証明サービスもあります。
            {'\n'}
            利用登録が必要であったり、Word形式での提出が必要など、利用するための条件がございますので、詳細は、以下の日本郵便ウェブサイトをご参照ください。
          </Text>
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://e-naiyo.post.japanpost.jp/enaiyo_kaiin/enaiyo/enkn110/engm111.xhtml',
              ).catch((err) => console.error('URLを開けませんでした。', err))
            }
          >
            https://e-naiyo.post.japanpost.jp/enaiyo_kaiin/enaiyo/enkn110/engm111.xhtml
          </Text>
          <Text style={styles.text}>
            {'\n\n'}
            本アプリで制作できる内容証明郵便は、基本的に郵便局での提出を想定していますが、PDFのほか、Word形式での出力も可能ですので、出力後、Wordで編集することで、電子内容証明サービスにて活用いただくことも可能となっております。
            {'\n'}
            是非ご利用ください。{'\n'}
          </Text>
        </>
      ) : (
        <></>
      )}

      {variable == '訴状' ? (
        <>
          <Text style={styles.title}>1. 訴えを起こす裁判所(管轄裁判所)</Text>
          <Text style={styles.text}>
            原則として、相手方の住所地を管轄する簡易裁判所です。{'\n'}
            事件の種類によっては、ほかの簡易裁判所にも訴えを起こすことができます。
          </Text>
          <Text style={styles.title}>2. 少額訴訟の流れ</Text>
          <Text style={styles.text}>
            <Text style={styles.number}>①</Text>
            　3.に記載の必要なものを準備の上、訴えを起こす簡易裁判所に郵送で、又は直接、提出
            {'\n'}
            <Text style={styles.number}>②</Text>
            　事件番号と口頭弁論期日が決定{'\n'}
            <Text style={styles.number}>③</Text>　口頭弁論期日{'\n'}
            <Text style={styles.number}>④</Text>　判決
          </Text>
          <Text style={styles.title}>3. 少額訴訟を起こすために必要なもの</Text>
          <Text style={styles.text}>
            以下をご用意いただき、訴えを起こす簡易裁判所に郵送で、又は直接、提出してください。
            {'\n\n'}
            (1) 訴状{'\n'}
            本アプリで紹介する次の手順で、必要事項を記載すれば作成することができます。
            {'\n'}
            作成後、WordとPDFで出力できますので、必要に応じて修正の上、ご自宅のプリンターやセブンイレブンのネットプリンターなどで印刷し、ご使用ください。
            {'\n\n'}
            本アプリを使用しない場合、各簡易裁判所で貰うことのできる定型用紙や裁判所ウェブサイトからダウンロード可能な書式を用いて作成することになります。
            {'\n\n'}
            訴状は、同じものを合計３部印刷ください。（被告が１名の場合）{'\n'}
            裁判所提出用の正本が１通と、被告の分の副本、そして自分の控えです。
            {'\n'}
            被告が複数いる場合には、被告の人数分、副本を増やします。{'\n'}
            控えは提出する必要がなく、提出するのは正本と副本のみです。{'\n\n'}
            (2) 証拠の写し{'\n'}
            相手方との契約書など、証拠として使用できるものを準備ください。{'\n'}
            口頭弁論当日は証拠の原本が必要となりますのでご注意ください。{'\n\n'}
            (3) 申立手数料{'\n'}
            収入印紙でご準備ください。{'\n'}
            請求金額（訴額）に応じて、以下の通り手数料の金額が違います。なお、請求金額は遅延損害金や利息等を含めない金額です。
            {'\n'}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>請求金額</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>手数料</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>請求金額</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>手数料</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>～10万円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>1千円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>～40万円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>4千円</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>～20万円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>2千円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>～50万円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>5千円</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>～30万円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>3千円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>～60万円</Text>
            </View>
            <View style={{ width: '20%' }}>
              <Text style={styles.text}>6千円</Text>
            </View>
          </View>
          <Text style={styles.text}>
            {'\n'}
            (4) 切手代{'\n'}
            裁判所からの連絡は郵送で行われますので、その際にかかる費用です。
            {'\n'}
            相手の人数や書類を送る回数によっても変わってきますが、大体4,000～5,000円程度かかります。
            {'\n'}
            裁判所によって必要な金額と内訳が異なるので、事前に裁判所に連絡をして、書記官に確認しておく必要があります。
            {'\n'}
            未使用の切手があれば、手続き終了後に返してもらうことができます。
            {'\n\n'}
            (5) 印鑑{'\n'}
            郵送ではなく簡易裁判所に訴状を持参する場合は、訴状に押印した印鑑と同じ印鑑をご用意ください。
            {'\n\n'}
            (6) 添付書類{'\n'}
            当事者（ご自身もしくは相手方）が法人の場合：登記事項証明書 １通
            {'\n'}
            当事者（ご自身もしくは相手方）が未成年の場合：親権者を証明する戸籍謄本
            １通
          </Text>
          <Text style={styles.title}>4. 事件番号と口頭弁論期日について</Text>
          <Text style={styles.text}>
            裁判所では記録管理のために、１つ１つの裁判に事件番号が付けられます。
            {'\n'}
            判決後の裁判所とのやりとりには、その事件番号が必要になりますので覚えておきましょう。
            {'\n\n'}
            また、口頭弁論期日とは裁判が行われる当日のことを言います。{'\n'}
            相手方にも訴状の副本や裁判への呼び出し状などが送られますが、その際に相手方が期日について都合が悪く、
            {'\n'}
            期日の変更を申し出て認められた場合は、期日が変更されます。
          </Text>
          <Text style={styles.title}>5. 口頭弁論期日について</Text>
          <Text style={styles.text}>
            口頭弁論期日に持って行くものは以下の通りです。{'\n'}
            ・訴状{'\n'}
            ・答弁書（訴状に対する相手方の返答内容。裁判所から送られてきている場合のみです。）
            {'\n'}
            ・証拠の原本{'\n'}
            ・筆記用具{'\n'}
            あらかじめ証人申請をしている場合は、証人に同行してもらいます。
            {'\n'}
            証人が遠くに住んでいるような場合は、電話会議システムという方法で証人尋問することも出来ます。
            {'\n\n'}
            口頭弁論の流れは以下の通りです。{'\n'}
            <Text style={styles.number}>①</Text> 裁判官による手続きの説明{'\n'}
            裁判官が被告（相手側）に対し、少額訴訟による裁判で良いのかどうか聞き、望まない場合は通常訴訟で行われることになります。
            {'\n'}
            <Text style={styles.number}>②</Text> 訴状や答弁書の陳述{'\n'}
            裁判官は原告に対し、主張は訴状の通りか聞き、被告に対し、言い分は答弁書の通りかどうか聞きます。
            {'\n'}
            <Text style={styles.number}>③</Text>{' '}
            裁判官によって証拠調べが行われ、判決が言い渡されます{'\n'}
            判決が言い渡される前に和解案が出される場合があります。
          </Text>
          <Text style={styles.text}>
            {'\n\n'}
            その他詳細については、以下の簡易裁判所ウェブサイトや、{'\n'}
            裁判所の窓口では裁判所書記官の方に相談することができますので、ご活用ください。
          </Text>
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(
                'https://www.courts.go.jp/saiban/syurui/syurui_minzi/minzi_04_02_08/index.html',
              ).catch((err) => console.error('URLを開けませんでした。', err))
            }
          >
            https://www.courts.go.jp/saiban/syurui/syurui_minzi/minzi_04_02_08/index.html
          </Text>
          <Text style={styles.text}>{'\n'}</Text>
        </>
      ) : (
        <></>
      )}

      {variable == '仮処分命令申立書' ? (
        <>
          <Text style={styles.title}>1. 仮処分命令申立　書類作成</Text>
          <Text style={styles.text}>
            以下７点の書類準備が必要になります。{'\n'}
            また、申立人（ご自身）が法人であれば法人の登記簿謄本も必要となりますのでご用意ください。
            {'\n\n'}
            (1) 仮処分申立書＋別紙目録{'\n'}
            書類が完成しましたら、１部を印刷し、収入印紙2,000円を貼付けの上、２部（裁判所提出用・相手方代理人用・自分用）を印刷ください。
            {'\n'}
            債権者（ご自身）の氏名の横には印鑑を押します（認印で可）。
            {'\n\n'}
            (2) 管轄上申書{'\n'}
            債権者（ご自身）の氏名の横には印鑑を押します（認印で可）。{'\n\n'}
            ・管轄上申書を提出する必要性{'\n'}
            外国法人であるTwitter社は日本国内に拠点を有しないため「管轄が定まらないとき」に該当し、民事訴訟法１０条の２及び民事訴訟規則６条の２の適用により「東京都千代田区」を管轄する裁判所（東京地裁）に管轄が認められることとなります。この主張を記載した上申書を提出する必要があります。
            {'\n\n'}
            (3) 証拠説明書{'\n'}
            事件番号は書類が受け付けられるまで、記載不要です。{'\n'}
            債権者（ご自身）の氏名の横には印鑑を押します（認印で可）。{'\n\n'}
            (4) 陳述書{'\n'}
            名誉棄損（虚偽事実の適示）であると主張する場合は陳述書を作成し、反真実性の主張をする必要があります。
            {'\n'}
            名誉感情侵害のツイートに対して訴えを起こす場合は不要です。{'\n\n'}
            事件番号は書類が受け付けられるまで、記載不要です。{'\n'}
            陳述書は印刷後、最後に住所と氏名を手書きし、押印します。（認印で可）
            {'\n\n'}
            (5) Whois検索結果{'\n\n'}
            (6) 本件投稿記事{'\n\n'}
            (7) Twitter社の資格証明書とその翻訳文
          </Text>
          <Text style={styles.title}>
            2. 仮処分命令申立　書類作成後の対応方法
          </Text>
          <Text style={styles.text}>
            以下の各書類を準備できましたら、管轄の裁判所となる東京地方裁判所へ提出し債権者面接を行います。
            {'\n\n'}(1) 仮処分申立書＋別紙目録{'\n'}(2) 管轄上申書{'\n'}(3)
            証拠説明書{'\n'}
            (4) 陳述書{'\n'}
            (5) Whois検索結果{'\n'}
            (6) 本件投稿記事{'\n'}
            (7) Twitter社の資格証明書とその翻訳文
            {'\n\n'}
            提出方法は直接持参と郵送の２通りがあります。{'\n'}
            持参先/郵送先は下記になります。郵送の場合は直接持参よりも受付審査に時間を要する可能性があります。
            {'\n\n'}
            〒100-8920{'\n'}
            東京都千代田区霞が関一丁目１番４号{'\n'}
            東京地方裁判所 民事９部{'\n\n'}
            受付後、債権者面接の日程を決定することになります。{'\n'}
            債権者面接は裁判官と面談を行い、手続きの流れ等の確認となります。
            {'\n'}
            また明らかに開示が認められなさそうなものについてはこの時点で、取下げるよう勧告される場合もあります。
            {'\n\n'}
            裁判所の方と直近で日程調整を行い、債権者面接日に東京地裁へ出頭します。
            {'\n'}
          </Text>
        </>
      ) : (
        <></>
      )}

      {variable == '上申書' ? (
        <>
          <Text style={styles.title}>1. 双方審尋期日まで</Text>
          <Text style={styles.text}>
            Twitter社の代理人より書類受領の旨と双方審尋期日に出頭可能な日時の候補が送られてきますので当該日程候補を裁判所へ連絡します。
            {'\n'}
            連絡方法ですが、上申書を裁判所へFAXいたします。{'\n'}
            必要項目を記載することで、上申書を作成することができます。{'\n'}
            PDFのほか、Wordで出力することができますので、細かい修正が必要な場合はご自身のPCに転送いただき、ご修正ください。
          </Text>
          <Text style={styles.title}>2. 双方審尋期日</Text>
          <Text style={styles.text}>
            上申書で裁判所へ提示した日程候補の中から、双方審尋期日が決定され、決定した日に出頭いたします。
            {'\n'}
            遠方で出頭が困難な場合は、電話会議で参加することが出来ますので裁判所にその旨申入れを行ってください。
            {'\n'}
            このタイミングで大体裁判官より連絡があり、開示決定が出るか否か概ね判明します。
            {'\n\n'}
            また、受付後に何か訂正する必要が生じた場合は「訂正申立書」を提出して訂正します。
            {'\n'}
            必要項目を記載することで、訂正申立書を作成することができます。{'\n'}
          </Text>
        </>
      ) : (
        <></>
      )}

      {variable == '無担保上申書' ? (
        <>
          <Text style={styles.title}>1. 仮処分命令発令</Text>
          <Text style={styles.text}>
            双方審尋期日が終了して、仮処分命令の発令がされることとなった場合は、下記２点を裁判所へ提出いたします。
            {'\n\n'}
            (1) 無担保上申書{'\n'}
            仮処分命令発令にあたり、Twitter社は基本的に、担保を要求しません。
            {'\n'}
            しかし原則は、担保をたてますので、無担保で発令をしていただくためには手続上、上申書を提出することになっています。
            {'\n'}
            必要項目を記載することで、無担保上申書を作成することができます。
            {'\n\n'}
            (2) 決定書用の目録差し入れ{'\n'}
            決定書の別紙となる目録を３部提出します。ここで必要な目録は一番最初の「仮処分申立書」と一緒に作成した以下の３点です。
            {'\n'}
            ・当事者目録{'\n'}
            ・発信者情報目録{'\n'}
            ・対象アカウント目録
          </Text>
          <Text style={styles.title}>2. 発令後（受取り）</Text>
          <Text style={styles.text}>
            仮処分命令の発令が決定すると、裁判所よりいつから受け取れるようになるか連絡があります。
            {'\n'}
            受け取る際は、受書が必要となります。{'\n'}
            必要項目を記載することで、受書を作成することができます。{'\n'}
            PDFのほか、Wordで出力することができますので、細かい修正が必要な場合はご自身のPCに転送いただき、ご修正ください。
            {'\n'}
            なお、受書がなかったとしても申立ての際に使用した印鑑を持参し、窓口で受書を記載すれば受取り可能です。
            {'\n'}
          </Text>
        </>
      ) : (
        <></>
      )}

      {variable == 'アクセスログ保存要請書' ? (
        <>
          <Text style={styles.title}>1. プロバイダへログ保存要請書を送付</Text>
          <Text style={styles.text}>
            開示されたIPアドレスをWhoisで検索し、プロバイダを特定することが出来ましたら、当該プロバイダへログ保存要請書を送付いたします。
            {'\n'}
            必要項目を記載することで、ログ保存要請書を作成することができます。
            {'\n'}
            PDFのほか、Wordで出力することができますので、細かい修正が必要な場合はご自身のPCに転送いただき、ご修正ください。
            {'\n\n'}
            ほとんどのプロバイダはログが残っていれば保存要請に応じてくれますので、これによってログが消える恐れがなくなり、訴訟にむけて時間的余裕が出来ます。
            {'\n'}
            しかし、この時点でログが消えていた場合は残念ながら、相手を特定することが出来なくなります。
            {'\n'}
            保存期間は大体３ヶ月～６ヶ月。早ければ２週間、ながければ１年等、プロバイダによって変わりますので、速やかに対応を進めることをお勧めします。
            {'\n\n'}
            一例として、プロバイダがソフトバンクの場合は、ログ保存要請書以外に正式な開示請求として、テレコムサービス協会ガイドライン書式の「発信者情報開示請求書」もあわせて送付する必要がございます。
            {'\n'}
            必要項目を記載することで、発信者情報開示請求書を作成することができます。
            {'\n'}
            PDFのほか、Wordで出力することができますので、細かい修正が必要な場合はご自身のPCに転送いただき、ご修正ください。
            {'\n\n'}
            プロバイダによって手続の仕方はそれぞれ異なりますので必ずサイトごとに手続方法を確認の上、保存要請や開示請求書を発送しましょう。
            {'\n'}
          </Text>
          <Text style={styles.title}>2. ログの保存完了</Text>
          <Text style={styles.text}>
            ログの保存が完了すると一週間後ぐらいに、プロバイダから通知書が書留で送付されます。
            {'\n'}
            ログが保存されていない場合は、その旨が記載された手紙が送付されます。
            {'\n'}
          </Text>
        </>
      ) : (
        <></>
      )}

      {variable == '発信者情報開示請求書' ? (
        <>
          <Text style={styles.title}>投稿者の情報開示請求</Text>
          <Text style={styles.text}>
            必要項目を記載することで、発信者情報開示請求書を作成することができます。
            {'\n'}
            PDFのほか、Wordで出力することができますので、細かい修正が必要な場合はご自身のPCに転送いただき、ご修正ください。
            {'\n'}
            ログ保存要請でソフトバンク向けに送った発信者情報開示請求書に近い書式ですが、別の書類となっております。
            {'\n\n'}
            また、発信者情報開示請求書の注記にも記載がありますが、以下の書類も一緒に送る必要がありますのでご用意ください。
            {'\n'}
            上記の通り、プロバイダごとに添付書類が決められている場合もありますので、合わせてご確認ください。
            {'\n\n'}
            (1)　公的書類の写し{'\n'}
            (2)　印鑑証明書{'\n'}
            (3)　誹謗中傷を受けた証拠{'\n'}
            (4)　IPアドレスを証明する書類{'\n'}
          </Text>
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default SubmitScreen;
